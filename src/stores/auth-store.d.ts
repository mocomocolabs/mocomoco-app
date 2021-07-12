import { Task as TaskType } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up.d'
import { IUserDto } from './user-store.d'

export type SignUpTask = TaskType<[Partial<ISignUpForm>], void>
export type SignInTask = TaskType<[string, string], void>

export interface IAuthUserDto extends IUserDto {
  accessToken: string
  refreshToken: string
  chatroomIds: []
}
