import { TaskBy } from './task'
import { IUserDto } from './user-store.d'

export interface ICommentDto {
  id: number
  user: IUserDto
  content: string
  createdAt: string // TODO: 임시
  isUse: boolean
}

export interface IInsertComment {
  feedId: number
  content: string
}

export interface IUpdateComment {
  id: number
  feedId: number
  content: string
}

export interface IDeleteComment {
  feedId: number
  commentId: number
}

export type InsertCommentTask = TaskBy<IInsertComment>
export type UpdateCommentTask = TaskBy<IUpdateComment>
export type DeleteCommentTask = TaskBy<IDeleteComment>
