import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IAuthUser } from '../models/auth'
import { ISignUpForm } from '../models/sign-up'
import { api } from '../services/api-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { IAuthUserDto, SignInTask, SignUpTask } from './auth-store.d'
import { TaskBy } from './task'
import { Task } from './task.d'

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

  @task.resolved
  checkEmail = (async (email: string) => {
    return http.post(`/sys/users/email/exists`, { email })
  }) as TaskBy<string>

  @task.resolved
  checkNickname = (async (nickname: string) => {
    return http.post(`/sys/users/nickname/exists`, { email: nickname })
  }) as TaskBy<string>

  @task.resolved
  signUp = (async (form) => {
    const param = { ...form }
    // TODO: fcmToken 업데이트
    param.fcmToken = '_'

    delete param.rePassword

    param.password = inko.ko2en(param.password!)
    if (!param.nickname) {
      param.nickname = param.name
    }

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
      .then(async (authUser: IAuthUserDto) => await this.signInCallback(authUser))
  }) as SignInTask

  @action
  signInCallback = async (authUser: IAuthUserDto) => {
    console.log('signInCallback', authUser)
    await this.setAuth(authUser)
    this.setUser(authUser)
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
        await api.get<IAuthUserDto>(signInWithTokenApiUrl).then(async (authUser: IAuthUserDto) => {
          this.setUser(authUser)
          this.setIsLogin(true)
        })
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
    api.post<IAuthUserDto>('/auth/refresh-token', {}).then(async (authUser: IAuthUserDto) => {
      await this.setAuth(authUser)
    })
  }

  @task.resolved
  signOut = (async () => {
    await api.post<number>(`/auth/sign-out`)
    await this.signOutCallback()
  }) as Task

  @action
  signOutCallback = async () => {
    await storage.clear()
    api.setAuthoriationBy('')
    this.setUser({} as IAuthUserDto)
    this.setIsLogin(false)
  }

  @action
  async setAuth(user: IAuthUserDto) {
    const { accessToken, refreshToken } = user
    await storage.setAccessToken(accessToken)
    await storage.setRefreshToken(refreshToken)
    await storage.setAccessTokenForSync()
    api.setAuthoriationBy(accessToken)
  }

  @action
  setUser(user: IAuthUserDto) {
    const { communities } = user
    this.user = {
      ...user,
      communityId: communities?.[0]?.id,
    }
  }
}
