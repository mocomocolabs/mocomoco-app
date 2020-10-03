import { task } from 'mobx-task'
import { http } from '../utils/http-util'
import { IInsertComment, InsertCommentTask, IUpdateComment, UpdateCommentTask } from './comment-store.d'
import { TaskByNumber } from './task'

const initState = {}

export class Comment {
  @task.resolved
  insertComment = (async ({ feedId, content }: IInsertComment) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.post(`/comment`, { feedId, content })
  }) as InsertCommentTask

  @task.resolved
  updateComment = (async ({ id, content }: IUpdateComment) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.put(`/comment/${id}`, { content })
  }) as UpdateCommentTask

  @task.resolved
  deleteComment = (async (id: number) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.delete(`/comment/${id}`)
  }) as TaskByNumber
}
