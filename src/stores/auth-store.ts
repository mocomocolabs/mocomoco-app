import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'
import { api } from '../services/api-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { IAuthUser, IAuthUserDto, SignInTask, SignUpTask } from './auth-store.d'
import { TaskByString } from './task'

const inko = new Inko()

const initState = {
  signUpForm: {
    locale: 'ko_KR',
    roles: 'ROLE_USER',
  } as Partial<ISignUpForm>,
  user: {} as IAuthUser,
}

export class Auth {
  @observable.struct signUpForm: Partial<ISignUpForm> = initState.signUpForm
  @observable isLogin = false
  @observable.struct user: IAuthUser = initState.user

  constructor() {}

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
  checkEmail = (async (email) => {
    return http.post(`http://localhost:8080/api/sys/users/exists`, { email })
  }) as TaskByString

  @task.resolved
  signUp = (async (form) => {
    // TODO: 서버팀과 논의후 제거 결정
    const param = { ...form }
    param.fcmToken = '_'
    param.profileUrl = '_'
    param.mobile = '0'
    //

    delete param.rePassword

    param.password = inko.ko2en(param.password!)
    if (!param.nickname) {
      param.nickname = param.name
    }

    await http.post(`http://localhost:8080/api/auth/sign-up`, param).then((r) => {
      console.log(r)
    })
  }) as SignUpTask

  @task.resolved
  signIn = (async (email: string, password: string) => {
    await http
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

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      try {
        await api.post<IAuthUserDto>(`http://localhost:8080/api/auth/user`, {}).then((user) => {
          this.setUser(user)
        })
      } catch (e) {
        // TODO: 에러코드 서버와 협의 필요
        // 실패시 로그인 페이지로 redirect
        if (e.status === 405) {
          const refreshToken = await storage.getRefreshToken()
          api.setAuthoriationBy(refreshToken)
          api.post<IAuthUserDto>(`http://localhost:8080/api/auth/refresh-token`, {}).then((user) => {
            this.setAuth(user)
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
    api.setAuthoriationBy(accessToken)
  }

  @action
  setUser(user: IAuthUserDto) {
    const { id, email, name, nickname, profileUrl, communities } = user

    this.user = {
      id,
      email,
      name,
      nickname,
      profileUrl,
      communities: communities.map((v) => ({
        id: v.id,
        name: v.name,
        // TODO: 추가필요
        // count: v.count,
        bannerUrl: v.atchFiles?.slice(-1)?.pop()?.url,
      })),
    }

    this.setIsLogin()
  }
}
