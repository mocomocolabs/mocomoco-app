import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { Feed } from '../models/feed'
import { FEED_TYPE, IFeed, IFeedForm } from '../models/feed.d'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import { AuthStore } from './auth-store'
import { IFeedDto, SaveFeedTask } from './feed-store.d'
import { Task, TaskBy, TaskBy2 } from './task'

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
    await api
      .get<{ feeds: IFeedDto[] }>(`/v1/feeds?community-id=${this.$auth.user.communityId}&is-use=true`)
      .then(
        action((data) => {
          this.feeds = data.feeds.map((v) => Feed.of(v, this.$auth.user.id))
        })
      )
  }) as Task

  @task
  getMyFeeds = (async () => {
    //TODO use query instead of filter
    await api.get<{ feeds: IFeedDto[] }>('/v1/feeds').then(
      action((data) => {
        this.feeds = data.feeds
          .filter((feed) => feed.user.id === this.$auth.user.id)
          .map((v) => Feed.of(v, this.$auth.user.id))
      })
    )
  }) as Task

  @task
  getFeed = (async (id: number) => {
    await api.get<IFeedDto>(`/v1/feeds/${id}`).then(
      action((v) => {
        this.feed = Feed.of(v, this.$auth.user.id)
      })
    )
  }) as TaskBy<number>

  @task
  getFeedForm = (async (id: number) => {
    await api.get<IFeedDto>(`/v1/feeds/${id}`).then(
      action(async (data) => {
        console.log(data)

        const images: any = await Promise.all(data.atchFiles?.map((v) => urlToFile(v.url)))

        this.setForm({
          ...data,
          scheduleDate: data.scheduleDate.substr(0, 8),
          scheduleTime: data.scheduleDate.substr(8),
          images,
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

    await api.patch(`/v1/feeds/${id}/is-use`, formData)
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
              scheduleTitle: form.scheduleTitle,
              scheduleDate: form.scheduleDate + form.scheduleTime,
            }),
            title: form.title,
            content: form.content,
            isPublic: form.isPublic,
            isUse: true,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    )

    form.images?.forEach((v) => {
      formData.append('files', v)
    })

    if (isUpdate) {
      await api.put('/v1/feeds', formData)
    } else {
      await api.post(`/v1/feeds`, formData)
    }
    this.resetForm()
  }) as SaveFeedTask

  @task.resolved
  toggleFeedLike = (async (feedId: number, isLike: boolean) => {
    await api.post('/v1/feeds-users/likes', { feedId, isLike, isUse: true })
    this.setFeedLike(feedId, isLike)
  }) as TaskBy2<number, boolean>

  @action
  setFeedLike(id: number, isLike: boolean) {
    let found = this.feeds.find((v) => v.id === id)

    if (found) {
      const likeCount = isLike ? found.likeCount + 1 : found.likeCount - 1
      // TODO: feeds의 일부 프로퍼티가 변경되어도 리렌더가 되지 않는다. 원인 파악 필요
      this.feeds = this.feeds.map((v) => {
        return v.id === id ? { ...found!, isLike, likeCount } : v
      })
    }
  }

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
