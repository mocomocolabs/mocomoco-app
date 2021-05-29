import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IFeed, IFeedForm } from '../models/feed'
import { httpFile } from '../utils/http-file-util'
import { http } from '../utils/http-util'
import { urlToFile } from '../utils/image-util'
import { AuthStore } from './auth-store'
import { InsertFeedTask } from './feed-store.d'
import { Task, TaskBy } from './task'

const initState = {
  feeds: [],
  /* eslint-disable */
  feed: {} as any,
  form: {
    title: '',
    content: '',
  } as IFeedForm,
}

export class FeedStore {
  @observable.ref feeds: IFeed[] = initState.feeds
  @observable.ref feed: IFeed = initState.feed
  @observable.struct form: IFeedForm = initState.form
  @observable deleted = false

  $auth: AuthStore

  constructor(rootStore: RootStore) {
    this.$auth = rootStore.$auth
  }

  @task
  getFeeds = (async () => {
    await http.get<IFeed[]>('/feeds').then(
      action((data) => {
        this.feeds = data
      })
    )
  }) as Task

  @task
  getMyFeeds = (async () => {
    //TODO use query instead of filter
    await http.get<IFeed[]>('/feeds').then(
      action((data) => {
        this.feeds = data.filter((feed) => feed.user.id === this.$auth.user.id)
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
  }) as TaskBy<number>

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
  }) as TaskBy<number>

  @task.resolved
  deleteFeed = (async (id: number) => {
    await new Promise((r) => setTimeout(() => r(1), 1000))
    await http.delete(`/feeds/${id}`)
  }) as TaskBy<number>

  @task.resolved
  insertFeed = (async (form: IFeedForm) => {
    await new Promise((r) => setTimeout(() => r(1), 1000))
    const formData = new FormData()
    // TODO: communityId 추가
    // "feedReqDto": {
    //   "type": "string",
    //   "title": "string",
    //   "content": "string",
    //   "scheduleDate": "string",
    //   "isPublic": true,
    //   "isUse": true
    // },
    // "files": [
    //   "string"
    // ]
    formData.append('communityId', String(form.communityId))
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
  setFormImages(imgs: ImageUploadItem[]) {
    this.form.images = imgs
  }

  @action
  resetForm() {
    this.form = initState.form
  }
}
