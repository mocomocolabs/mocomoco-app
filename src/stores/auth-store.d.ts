import { ISignUpForm } from '../models/sign-up.d'
import { TaskBy, TaskBy2 } from './task'
import { IUserDto } from './user-store.d'

export type SignUpTask = TaskBy<Partial<ISignUpForm>>
export type SignInTask = TaskBy2<string, string>

export interface IAuthUserDto extends IUserDto {
  accessToken: string
  refreshToken: string
  chatroomIds: []
}
