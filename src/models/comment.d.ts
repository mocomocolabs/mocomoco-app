import { IUser } from './user'

export interface IComment {
  id: number
  user: IUser
  content: string
  createdAt: string // TODO: 임시
}
