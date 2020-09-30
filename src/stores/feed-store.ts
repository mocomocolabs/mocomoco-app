import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IFeed } from '../models/feed'
import { http } from '../utils/http-util'
import {
  DeleteCommentTask,
  IDeleteComment,
  IInsertComment,
  InsertCommentTask,
  IUpdateComment,
  UpdateCommentTask,
} from './feed-store.d'
import { Task, TaskByNumber } from './task'

const initState = {
  feeds: [],
  /* eslint-disable */
  feed: {} as any,
}

export class Feed {
  @observable.ref feeds: IFeed[] = initState.feeds
  @observable.ref feed: IFeed = initState.feed

  @task
  getFeeds = (async () => {
    await http.get<IFeed[]>('/feeds').then(
      action((data) => {
        this.feeds = data
      })
    )
  }) as Task

  @task
  getFeed = (async (id: number) => {
    await http.get<IFeed>(`/feeds/${id}`).then(
      action((data) => {
        this.feed = data
      })
    )
  }) as TaskByNumber

  @task.resolved
  insertComment = (async ({ feedId, content }: IInsertComment) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.post(`/feeds/${feedId}/comment`, { content }).then(() => this.getFeed(feedId))
  }) as InsertCommentTask

  @task.resolved
  updateComment = (async ({ feedId, commentId, content }: IUpdateComment) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.put(`/feeds/${feedId}/comment/${commentId}`, { content }).then(() => this.getFeed(feedId))
  }) as UpdateCommentTask

  @task.resolved
  deleteComment = (async ({ feedId, commentId }: IDeleteComment) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.delete(`/feeds/${feedId}/comment/${commentId}`).then(() => this.getFeed(feedId))
  }) as DeleteCommentTask
}
