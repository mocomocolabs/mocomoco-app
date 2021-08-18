import { IUser } from './user.d';

export interface IComment {
  id: number
  user: IUser
  content: string
  createdAt: string // TODO: 임시
}
