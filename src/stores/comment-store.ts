import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { api } from '../services/api-service'
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

  @task.resolved
  insertComment = (async ({ feedId, content }: IInsertComment) => {
    await api.post(`/feed-comments`, { feedId, content })
  }) as InsertCommentTask

  @task.resolved
  updateComment = (async (payload: IUpdateComment) => {
    await api.put(`/feed-comments`, payload)
  }) as UpdateCommentTask

  @task.resolved
  deleteComment = (async (id: number) => {
    await api.patch(`/feed-comments/${id}/is-use`)
  }) as TaskBy<number>

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
}
