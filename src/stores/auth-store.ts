import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { IAuthUser } from '../models/auth'
import { ISignUpForm } from '../models/sign-up'
import { api } from '../services/api-service'
import { route } from '../services/route-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { IAuthUserDto, SignInTask, SignUpTask } from './auth-store.d'
import { TaskBy } from './task'
import { UserStore } from './user-store'

const inko = new Inko()

const initState = {
  signUpForm: {
    locale: 'ko_KR',
    roles: 'ROLE_USER',
  } as Partial<ISignUpForm>,
  user: {} as IAuthUser,
}

export class AuthStore {
  @observable.struct signUpForm: Partial<ISignUpForm> = initState.signUpForm
  @observable isLogin = false
  @observable.struct user: IAuthUser = initState.user

  $user: UserStore

  constructor(rootStore: RootStore) {
    this.$user = rootStore.$user
  }

  @action
  setIsLogin() {
    this.isLogin = true
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
    return http.post(`/sys/users/exists`, { email })
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
      .then(async (authUser: IAuthUserDto) => {
        this.setAuth(authUser)
        this.setUser(authUser)
      })
  }) as SignInTask

  @action
  async signInWithToken() {
    const hasToken = await storage.getAccessToken()
    console.log('🚀 token', hasToken)

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      await storage.setAccessTokenForSync()
      try {
        await api.get<IAuthUserDto>(`/auth/account`).then(async (authUser) => {
          this.setUser(authUser)
        })
      } catch (e) {
        if (e.status === 401) {
          // TODO: action 분리
          const refreshToken = await storage.getRefreshToken()
          api.setAuthoriationBy(refreshToken)
          api
            .post<IAuthUserDto>(`/auth/refresh-token`, {})
            .then((user) => {
              this.setAuth(user)
            })
            .catch(() => {
              // TODO: 컴포넌트단에서 라우팅하는 것이 코드파악에 용이함
              route.signUp()
            })
        }
      }
    }
  }

  @action
  setAuth(user: IAuthUserDto) {
    const { accessToken, refreshToken } = user
    storage.setAccessToken(accessToken)
    storage.setRefreshToken(refreshToken)
    storage.setAccessTokenForSync()
    api.setAuthoriationBy(accessToken)
  }

  @action
  setUser(user: IAuthUserDto) {
    const { communities } = user
    this.user = {
      ...user,
      communityId: communities[0].id,
    }
    this.setIsLogin()
  }
}
