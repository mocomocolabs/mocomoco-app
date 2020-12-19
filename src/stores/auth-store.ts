import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'
import { http } from '../utils/http-util'
import { SignUpTask } from './auth-store.d'
const inko = new Inko()

const initState = {
  signUpForm: {
    locale: 'ko_KR',
    roles: 'ROLE_USER',
  } as Partial<ISignUpForm>,
}

export class Auth {
  @observable.struct signUpForm: Partial<ISignUpForm> = initState.signUpForm

  constructor() {}

  @action
  setSignUpForm(form: Partial<ISignUpForm>) {
    this.signUpForm = {
      ...this.signUpForm,
      ...form,
    }
  }

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
  signIn = (async (form: ISignUpForm) => {
    await http.post(`http://localhost:8080/api/auth/sign-up`, form).then((r) => {
      console.log(r)
    })
  }) as SignUpTask
}
