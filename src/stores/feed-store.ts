import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IFeed, IFeedForm } from '../models/feed'
import { httpFile } from '../utils/http-file-util'
import { http } from '../utils/http-util'
import { urlToFile } from '../utils/image-util'
import { InsertFeedTask } from './feed-store.d'
import { Task, TaskByNumber } from './task'

const initState = {
  feeds: [],
  /* eslint-disable */
  feed: {} as any,
  form: {
    title: '',
    content: '',
  } as IFeedForm,
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

  @task
  getFeedForm = (async (id: number) => {
    await http.get<IFeed>(`/feeds/${id}`).then(
      action(async (data) => {
        const images: any = await Promise.all(data.imageUrls.map((v) => urlToFile(v)))

        this.setForm({
          id,
          type: data.type,
          scheduleDate: data.scheduleDate,
          // TODO: 협의후 구현
          // scheduleTime: data.scheduleTime,
          scheduleTitle: data.scheduleTitle,
          title: data.title,
          content: data.content,
          images,
          isPublic: data.isPublic,
        })
      })
    )
  }) as TaskByNumber

  @task.resolved
  deleteFeed = (async (id: number) => {
    await new Promise((r) => setTimeout(() => r(1), 1000))
    await http.delete(`/feeds/${id}`)
  }) as TaskByNumber

  @task.resolved
  insertFeed = (async (form: IFeedForm) => {
    await new Promise((r) => setTimeout(() => r(1), 1000))
    const formData = new FormData()
    formData.append('type', form.type)
    formData.append('scheduleDate', form.scheduleDate)
    formData.append('scheduleTime', form.scheduleTime)
    formData.append('scheduleTitle', form.scheduleTitle)
    formData.append('title', form.title)
    formData.append('content', form.content)
    formData.append('isPublic', form.isPublic ? 'true' : 'false')

    form.images?.forEach((v) => {
      formData.append('images', v)
    })

    await httpFile.post(`/feeds`, formData)
    this.resetForm()
  }) as InsertFeedTask

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
