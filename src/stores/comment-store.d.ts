import { Task } from 'mobx-task'
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

export type InsertCommentTask = Task<[IInsertComment], void>
export type UpdateCommentTask = Task<[IUpdateComment], void>
export type DeleteCommentTask = Task<[IDeleteComment], void>
