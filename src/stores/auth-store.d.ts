import { Task as TaskType } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'
import { IFileDto } from './common/file.d'

export type SignUpTask = TaskType<[Partial<ISignUpForm>], void>
export type SignInTask = TaskType<[string, string], void>

export interface IAuthUserDto {
  accessToken: string
  refreshToken: string
  id: number
  email: string
  name: string
  nickname: string
  profileUrl: string
  communities: [
    {
      id: number
      name: string
      atchFiles: IFileDto[]
      isUse: boolean
    }
  ]
  isUse: boolean
}

// TODO: 추후 IUser와 통합하는게 좋을지 논의 필요
export interface IAuthUser {
  id: number
  name: string
  nickname: string
  communities: ICommunity[]
  email: string
  profileUrl: string

  // TODO: 추가 필요
  // signUpStatus: string
  // showsEmail: boolean
}
