import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IAuthUser } from '../models/auth'
import { ISignUpForm } from '../models/sign-up'
import { api } from '../services/api-service'
import { route } from '../services/route-service'
import { storage } from '../services/storage-service'
import { IAuthUserDto, SignInTask, SignUpTask } from './auth-store.d'
import { TaskBy } from './task'

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
    return api.post(`http://localhost:8080/api/sys/users/exists`, { email })
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
    param.mobile = '123456789'

    return api.post(`http://localhost:8080/api/auth/sign-up`, param)
  }) as SignUpTask

  @task.resolved
  signIn = (async (email: string, password: string) => {
    await api
      .post<IAuthUserDto>(`http://localhost:8080/api/auth/sign-in`, {
        email,
        password: inko.ko2en(password),
      })
      .then((user: IAuthUserDto) => {
        this.setAuth(user)
        this.setUser(user)
      })
  }) as SignInTask

  @action
  async signInWithToken() {
    const hasToken = await storage.getAccessToken()
    console.log('🚀 token', hasToken)

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      try {
        await api.get<IAuthUserDto>(`http://localhost:8080/api/auth/account`).then((user) => {
          this.setUser(user)
        })
      } catch (e) {
        if (e.status === 405) {
          const refreshToken = await storage.getRefreshToken()
          api.setAuthoriationBy(refreshToken)
          api.post<IAuthUserDto>(`http://localhost:8080/api/auth/refresh-token`, {}).then((user) => {
            this.setAuth(user)
          })
        } else {
          route.signIn()
        }
      }
    }
  }

  @action
  setAuth(user: IAuthUserDto) {
    const { accessToken, refreshToken } = user
    storage.setAccessToken(accessToken)
    storage.setRefreshToken(refreshToken)
    api.setAuthoriationBy(accessToken)
  }

  @action
  setUser(user: IAuthUserDto) {
    const { id, communities, chatroomUserIds } = user
    this.user = { id, communityId: communities[0].id, chatroomIds: chatroomUserIds }
    this.setIsLogin()
  }
}
