import { Task } from 'mobx-task'

export interface IInsertComment {
  feedId: number
  content: string
}

export interface IUpdateComment {
  id: number
  content: string
}

export interface IDeleteComment {
  feedId: number
  commentId: number
}

export type InsertCommentTask = Task<[IInsertComment], void>
export type UpdateCommentTask = Task<[IUpdateComment], void>
export type DeleteCommentTask = Task<[IDeleteComment], void>
