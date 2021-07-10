import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { Feed } from '../models/feed'
import { FEED_TYPE, IFeed, IFeedForm, IFeedSchedule } from '../models/feed.d'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import { AuthStore } from './auth-store'
import { IFeedDto, IFeedScheduleDto, SaveFeedTask } from './feed-store.d'
import { Task, TaskBy, TaskBy2 } from './task'

const initState = {
  feeds: [],
  /* eslint-disable */
  feed: {} as any,
  form: {
    type: FEED_TYPE.NORMAL,
    communityId: 0,
    title: '',
    content: '',
    images: [],
    schedule: {} as any,
    isPublic: false,
  } as IFeedForm,
}

export class FeedStore {
  @observable.ref feeds: IFeed[] = initState.feeds
  @observable.ref homeFeeds: IFeed[] = []
  @observable.ref homeScheduleFeeds: IFeedSchedule[] = []
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
    await api.get<{ feeds: IFeedDto[] }>(`/v1/feeds?user-id=${this.$auth.user.id}`).then(
      action((data) => {
        this.feeds = data.feeds.map((v) => Feed.of(v, this.$auth.user.id))
      })
    )
  }) as Task

  @task
  getLikeFeeds = (async () => {
    await api.get<{ feeds: IFeedDto[] }>(`/v1/feeds`).then(
      action((data) => {
        this.feeds = data.feeds.filter((v) => v.isLike).map((v) => Feed.of(v, this.$auth.user.id))
      })
    )
  }) as Task

  @task
  getHomeFeeds = (async () => {
    await api
      .get<{ feeds: IFeedDto[] }>(
        `/v1/feeds?community-id=${this.$auth.user.communityId}&is-use=true&limit=10`
      )
      .then(
        action((data) => {
          this.homeFeeds = data.feeds.map((v) => Feed.of(v, this.$auth.user.id))
        })
      )
  }) as Task

  @task
  getHomeScheduleFeeds = (async () => {
    await api
      .get<{ schedules: IFeedScheduleDto[] }>(`/v1/schedules?sort-order=start-date-time_asc&limit=3`)
      .then(
        action((data) => {
          this.homeScheduleFeeds = data.schedules.map((v) => Feed.scheduleOf(v)!)
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
      action(async (dto) => {
        const images: any = await Promise.all(dto.atchFiles?.map((v) => urlToFile(v.url)))

        this.setForm({
          ...dto,
          schedule: Feed.scheduleOf(dto.schedule),
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
            schedule: form.schedule && {
              title: form.schedule.title,
              place: form.schedule.place,
              startDateTime: form.schedule.startDate + form.schedule.startTime,
              endDateTime: form.schedule.endDate + form.schedule.endTime,
            },
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
  }) as SaveFeedTask

  @task.resolved
  toggleFeedLike = (async (feedId: number, isLike: boolean) => {
    await api.post('/v1/feeds-users/likes', { feedId, isLike, isUse: true })
    this.setFeedLike(feedId, isLike)
  }) as TaskBy2<number, boolean>

  @action
  setFeedLike(id: number, isLike: boolean) {
    // TODO store의 현재 items와 item 데이터를 둘다 갱신해야 돼서 이렇게 구현했는데, 보기에 개운하지 않음.
    const found = this.feed.id === id ? this.feed : this.feeds.find((v) => v.id === id)

    if (found) {
      const likeCount = isLike ? found.likeCount + 1 : found.likeCount - 1

      this.feeds = this.feeds.map((v) => {
        return v.id === id ? { ...found!, isLike: isLike, likeCount: likeCount } : v
      })

      this.feed = this.feed.id === id ? { ...this.feed, isLike: isLike, likeCount: likeCount } : this.feed
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
  setFormSchedule(data: Partial<IFeedSchedule>) {
    this.form.schedule = {
      ...this.form.schedule,
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
