import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { AuthUser } from '../models/auth'
import { IAuthUser } from '../models/auth.d'
import { ISignUpForm, SIGN_UP_STATUS } from '../models/sign-up.d'
import { User } from '../models/user'
import { api } from '../services/api-service'
import { route } from '../services/route-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { isOfType } from '../utils/type-util'
import { IAuthUserDto, SignInTask, SignUpTask } from './auth-store.d'
import { TaskBy, TaskByAs } from './task'
import { IUserDto } from './user-store.d'

const inko = new Inko()

const initState = {
  signUpForm: {
    locale: 'ko_KR',
    roles: 'ROLE_USER',
  } as Partial<ISignUpForm>,
  user: {} as IAuthUser,
}

export const signInWithTokenApiUrl = '/auth/account'
export const refreshTokenApiUrl = '/auth/refresh-token'

export class AuthStore {
  @observable.struct signUpForm: Partial<ISignUpForm> = initState.signUpForm
  @observable isLogin = false
  @observable.struct user: IAuthUser = initState.user

  @action
  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin
  }

  @action
  setSignUpForm(form: Partial<ISignUpForm>) {
    this.signUpForm = {
      ...this.signUpForm,
      ...form,
    }
  }

  @action
  resetSignUpForm() {
    this.signUpForm = initState.signUpForm
  }

  @task.resolved
  checkEmailExists = (async (email: string) => {
    try {
      await http.post(`/sys/users/email/exists`, { email })
    } catch (e) {
      if (isOfType<{ status: number }>(e, 'status') && e.status === 409) {
        return true
      }

      throw e
    }

    return false
  }) as TaskByAs<string, boolean>

  @task.resolved
  checkNicknameExists = (async (nickname: string) => {
    try {
      await http.post(`/sys/users/nickname/exists`, { nickname })
    } catch (e) {
      if (isOfType<{ status: number }>(e, 'status') && e.status === 409) {
        return true
      }

      throw e
    }

    return false
  }) as TaskByAs<string, boolean>

  private makeUniqueNickname = async (nickname: string): Promise<string> => {
    return (await this.checkNicknameExists(nickname))
      ? await this.makeUniqueNickname(nickname + '2')
      : nickname
  }

  @task.resolved
  signUp = (async (form) => {
    const param = { ...form }
    // TODO: fcmToken 업데이트
    param.fcmToken = '_'

    delete param.rePassword

    param.password = inko.ko2en(param.password!)

    param.nickname = await this.makeUniqueNickname((param.nickname ? param.nickname : param.name)!)

    // TODO: 제거필요
    param.mobile = '_'

    return http.post(`/auth/sign-up`, param)
  }) as SignUpTask

  @task.resolved
  signIn = (async (email: string, password: string) => {
    await http
      .post<IAuthUserDto>(`/auth/sign-in`, {
        email,
        password: inko.ko2en(password),
      })
      .then(async (dto: IAuthUserDto) => await this.signInCallback(dto))
  }) as SignInTask

  @action
  signInCallback = async (dto: IAuthUserDto, ignoreAuth?: boolean) => {
    console.log('signInCallback', dto)

    // TODO sign-in api가 에러메시지를 응답하도록 수정한 후 이 부분을 삭제하자.
    const result: true | string = this.checkUserApproved(dto.status)
    if (result !== true) {
      throw new Error(result)
    }

    !ignoreAuth && (await this.setAuth(dto))

    this.setUser(AuthUser.of(dto))

    this.setIsLogin(true)
  }

  checkUserApproved = (status: SIGN_UP_STATUS) => {
    if (status === SIGN_UP_STATUS.승인) {
      return true
    }

    if (status === SIGN_UP_STATUS.대기) {
      return '마을의 하마지기가 가입신청내역을 확인하고 있어요.<br>안내를 받으신 후 로그인해주세요 :)'
    }

    return '가입신청이 승인되지 않아 로그인하실 수 없습니다.<br>마을의 하마지기에게 문의해주세요.'
  }

  @action
  async signInWithToken() {
    const hasToken = await storage.getAccessToken()
    console.log('🚀 token', hasToken)

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      await storage.setAccessTokenForSync()
      await api
        .get<IAuthUserDto>(signInWithTokenApiUrl)
        .then(async (dto: IAuthUserDto) => await this.signInCallback(dto, true))
    } else {
      console.log('🚀 there is no token!!')
      this.signOutCallback()
    }
  }

  @action
  refreshToken = async () => {
    console.log('👅 refresh token')

    const refreshToken = await storage.getRefreshToken()
    api.setAuthoriationBy(refreshToken)
    await api.post<IAuthUserDto>(refreshTokenApiUrl, {}).then(async (dto: IAuthUserDto) => {
      await this.setAuth(dto)
    })
  }

  @task.resolved
  signOut = (async () => {
    await api.post<number>(`/auth/sign-out`)
    await this.signOutCallback()
  }) as TaskBy<void>

  @action
  signOutCallback = async () => {
    await storage.clear()
    api.setAuthoriationBy('')
    this.setUser({} as IAuthUser)
    this.isLogin ? this.setIsLogin(false) : route.signUp()
  }

  @action
  async setAuth(dto: IAuthUserDto) {
    const { accessToken, refreshToken } = dto
    await storage.setAccessToken(accessToken)
    await storage.setRefreshToken(refreshToken)
    await storage.setAccessTokenForSync()
    api.setAuthoriationBy(accessToken)
  }

  @action
  setUser(user: IAuthUser) {
    this.user = user
  }

  updateUser = async () => {
    // TODO 서버에 요청하지 않고 $user.user가 업데이트되는 걸 리액션받을 방법이 있나?
    await api
      .get<IUserDto>(`/sys/users/${this.user.id}`)
      .then(action((userDto) => this.setUser({ ...this.user, ...User.of(userDto) })))
  }
}
