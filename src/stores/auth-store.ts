import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { AuthUser } from '../models/auth'
import { IAuthUser } from '../models/auth.d'
import { ISignUpForm } from '../models/sign-up'
import { User } from '../models/user'
import { api } from '../services/api-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
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
      if (e.status === 409) {
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
      if (e.status === 409) {
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

    !ignoreAuth && (await this.setAuth(dto))

    this.setUser(AuthUser.of(dto))

    !!!this.user.profileUrl && this.updateUser()

    this.setIsLogin(true)
  }

  @action
  async signInWithToken() {
    const hasToken = await storage.getAccessToken()
    console.log('🚀 token', hasToken)

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      await storage.setAccessTokenForSync()
      try {
        await api
          .get<IAuthUserDto>(signInWithTokenApiUrl)
          .then(async (dto: IAuthUserDto) => await this.signInCallback(dto, true))
      } catch (e) {
        if (e.status === 401) {
          this.refreshToken()
        }
      }
    }
  }

  @action
  refreshToken = async () => {
    console.log('👅 refresh token')

    const refreshToken = await storage.getRefreshToken()
    api.setAuthoriationBy(refreshToken)
    api.post<IAuthUserDto>('/auth/refresh-token', {}).then(async (dto: IAuthUserDto) => {
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
    this.setIsLogin(false)
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
