import { Task as TaskType } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'

export type SignUpTask = TaskType<[Partial<ISignUpForm>], void>
// export type SignInTask = TaskType<[ISignInForm], void>
