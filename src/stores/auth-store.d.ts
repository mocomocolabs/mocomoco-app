import { Task as TaskType } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up.d'

export type SignUpTask = TaskType<[Partial<ISignUpForm>], void>
export type SignInTask = TaskType<[string, string], void>

export interface IAuthUserDto {
  accessToken: string
  refreshToken: string
  id: number
  communities: {
    id: number
  }[]
  chatroomUserIds: []
}
