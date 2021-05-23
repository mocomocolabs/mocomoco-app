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
import { IFeedDto, SaveFeedTask } from './feed-store.d'
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
    await api.get<IFeedDto>(`/feeds/${id}`).then(
      action(async (data) => {
        console.log(data)

        const images: any = await Promise.all(data.atchFiles?.map((v) => urlToFile(v.url)))

        this.setForm({
          id,
          title: data.title,
          content: data.content,
          type: data.type,
          scheduleDate: data.scheduleDate.substr(0, 8),
          scheduleTime: data.scheduleDate.substr(8),
          // TODO: 협의후 구현
          // scheduleTime: data.scheduleTime,
          images,
          isPublic: data.isPublic,
        })
      })
    )
  }) as TaskBy<number>

  @task.resolved
  deleteFeed = (async (id: number) => {
    const formData = new FormData()

    formData.append(
      'feedReqDto',
      new Blob(
        [
          JSON.stringify({
            id,
            isUse: false,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    )

    await api.patch(`/feeds`, formData)
  }) as TaskBy<number>

  @task.resolved
  saveFeed = (async (form: IFeedForm, isUpdate: boolean) => {
    const formData = new FormData()

    formData.append(
      'feedReqDto',
      new Blob(
        [
          JSON.stringify({
            id: form.id,
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

    console.log(
      JSON.stringify({
        id: form.id,
        communityId: form.communityId,
        type: form.type,
        ...(form.type === FEED_TYPE.SCHEDULE && {
          scheduleDate: form.scheduleDate + form.scheduleTime,
        }),
        // TODO : scheduleTitle 추가 필요
        title: form.title,
        content: form.content,
        isPublic: form.isPublic,
      })
    )

    if (form.images.length === 0) {
      // TODO: 서버 코드 수정후 삭제
      form.images = [(await urlToFile('/assets/img/club/club01.jpg')) as any]
    }

    form.images?.forEach((v) => {
      formData.append('files', v)
    })

    if (isUpdate) {
      await api.put('/feeds', formData)
    } else {
      await api.post(`/feeds`, formData)
    }
    this.resetForm()
  }) as SaveFeedTask

  @action
  setForm(data: Partial<IFeedForm>) {
    this.form = {
      ...this.form,
      ...data,
    }
  }

  @action
  setFormImage(images: ImageUploadItem[]) {
    this.form = {
      ...this.form,
      images,
    }
  }

  @action
  resetForm() {
    this.form = initState.form
  }
}
