import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IFeed, IFeedForm } from '../models/feed'
import { http } from '../utils/http-util'
import { Task, TaskByNumber } from './task'

const initState = {
  feeds: [],
  /* eslint-disable */
  feed: {} as any,
  form: {} as any,
}

export class Feed {
  @observable.ref feeds: IFeed[] = initState.feeds
  @observable.ref feed: IFeed = initState.feed
  @observable.struct form: Partial<IFeedForm> = initState.form

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
  deleteFeed = (async (id: number) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.delete(`/feeds/${id}`)
  }) as TaskByNumber

  @action
  setForm(data: Partial<IFeedForm>) {
    this.form = {
      ...this.form,
      ...data,
    }
  }

  @action
  resetForm() {
    this.form = initState.form
  }
}
