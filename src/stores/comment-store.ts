import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { http } from '../utils/http-util'
import { IInsertComment, InsertCommentTask, IUpdateComment, UpdateCommentTask } from './comment-store.d'
import { TaskBy } from './task'

const initState = {
  insertForm: {},
  updateForm: {},
  updateCommentId: null,
}

export class CommentStore {
  @observable
  insertForm: {
    [feedId: number]: {
      feedId: number
      content: string
    }
  } = initState.insertForm
  @observable
  updateForm: {
    [commentId: number]: {
      commentId: number
      content: string
    }
  } = initState.updateForm
  @observable
  updateCommentId: number | null = initState.updateCommentId

  @action
  setUpdateCommentId(updateCommentId: number | null) {
    this.updateCommentId = updateCommentId
  }

  @action
  setInsertFormBy(feedId: number, content: string) {
    this.insertForm[feedId] = { feedId, content }
  }

  @action
  setUpdateFormBy(commentId: number, content: string) {
    this.updateForm[commentId] = { commentId, content }
  }

  @action
  resetInsertFormBy(feedId: number) {
    delete this.insertForm[feedId]
  }

  @action
  resetUpdateFormBy(commentId: number) {
    delete this.updateForm[commentId]
  }

  @task.resolved
  insertComment = (async ({ feedId, content }: IInsertComment) => {
    await new Promise((r) => setTimeout(() => r(true), 1000))
    await http.post(`/comment`, { feedId, content })
  }) as InsertCommentTask

  @task.resolved
  updateComment = (async ({ id, content }: IUpdateComment) => {
    await new Promise((r) => setTimeout(() => r(true), 1000))
    await http.put(`/comment/${id}`, { content })
  }) as UpdateCommentTask

  @task.resolved
  deleteComment = (async (id: number) => {
    await new Promise((r) => setTimeout(() => r(true), 1000))
    await http.delete(`/comment/${id}`)
  }) as TaskBy<number>
}
