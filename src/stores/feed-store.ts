import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { Feed } from '../models/feed'
import { FEED_TYPE, IFeed, IFeedForm } from '../models/feed.d'
import { api } from '../services/api-service'
import { http } from '../utils/http-util'
import { urlToFile } from '../utils/image-util'
import { AuthStore } from './auth-store'
import { IFeedDto, InsertFeedTask } from './feed-store.d'
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
    await api.get<{ feeds: IFeedDto[] }>(`/feeds?community-id=${this.$auth.user.communityId}`).then(
      action((data) => {
        console.log(data)
        this.feeds = data.feeds.map((v) => Feed.of(v))
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
    await api.get<IFeed>(`/feeds/${id}`).then(
      action((data) => {
        this.feed = data
      })
    )
  }) as TaskBy<number>

  @task
  getFeedForm = (async (id: number) => {
    await api.get<IFeed>(`/feeds/${id}`).then(
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
    await api.delete(`/feeds/${id}`)
  }) as TaskBy<number>

  @task.resolved
  insertFeed = (async (form: IFeedForm) => {
    const formData = new FormData()
    console.log(form)

    formData.append(
      'feedReqDto',
      new Blob(
        [
          JSON.stringify({
            communityId: form.communityId,
            type: form.type,
            ...(form.type === FEED_TYPE.SCHEDULE && {
              scheduleDate: form.scheduleDate + form.scheduleTime,
            }),
            // TODO : scheduleTitle 추가 필요
            title: form.title,
            content: form.content,
            isPublic: form.isPublic,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    )

    if (form.images.length === 0) {
      // TODO: 서버 코드 수정후 삭제
      form.images = [(await urlToFile('/assets/img/club/club01.jpg')) as any]
    }

    form.images?.forEach((v) => {
      formData.append('files', v)
    })

    await api.post(`/feeds`, formData)
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
