import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { Club } from '../models/club'
import { IClubForm } from '../models/club.d'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import { AuthStore } from './auth-store'
import { IClubDto, IJoinClubDto, InsertClubTask, JoinClubTask } from './club-store.d'
import { Task, TaskBy, TaskBy2 } from './task'

const initState = {
  club: {},
  form: {
    communityId: 0,
    name: '',
    meetingTime: '',
    meetingPlace: '',
    description: '',
    images: [],
    isPublic: false,
    hashtagNames: [],
  },
}

export class ClubStore {
  @observable.ref popularClubs: Club[] = []
  @observable.ref recentClubs: Club[] = []
  @observable.ref clubs: Club[] = []
  @observable.ref club: Club
  @observable.struct form: IClubForm = initState.form

  $auth: AuthStore

  constructor(rootStore: RootStore) {
    this.$auth = rootStore.$auth
  }

  @task
  getPopularClubs = (async (limit: number) => {
    // TODO: 페이징 처리 추후 구현
    await api
      .get<{ clubs: IClubDto[]; count: number }>(
        `/v1/clubs?community-id=${this.$auth.user.communityId}&sort-order=popular&limit=${limit}`
      )
      .then(
        action((data) => {
          this.popularClubs = data.clubs.map((v) => Club.of(v, this.$auth.user.id!))
        })
      )
  }) as TaskBy<number>

  @task
  getRecentClubs = (async () => {
    // TODO: 페이징 처리 추후 구현
    await api
      .get<{ clubs: IClubDto[]; count: number }>(
        `/v1/clubs?community-id=${this.$auth.user.communityId}&sort-order=created_at_desc&limit=999`
      )
      .then(
        action((data) => {
          this.recentClubs = data.clubs.map((v) => Club.of(v, this.$auth.user.id!))
        })
      )
  }) as Task

  @task
  getMyClubs = (async () => {
    // TODO: 페이징 처리 추후 구현
    await api
      .get<{ clubs: IClubDto[]; count: number }>(
        `/v1/clubs/users/${this.$auth.user.id}?sort-order=created_at_desc&limit=999`
      )
      .then(
        action((data) => {
          this.clubs = data.clubs.map((v) => Club.of(v, this.$auth.user.id!))
        })
      )
  }) as Task

  @task
  getLikeClubs = (async () => {
    // TODO: 페이징 처리 추후 구현
    await api
      .get<{ clubs: IClubDto[]; count: number }>(`/v1/clubs?sort-order=created_at_desc&limit=999`)
      .then(
        action((data) => {
          // TODO clubs api 바뀌면, 이 부분 교체하기
          // this.likeClubs = data.clubs.filter((v) => v.isLike).map((v) => Club.of(v, this.$auth.user.id))
          this.clubs = data.clubs
            .filter((v) => v.clubUsers.some((cu) => cu.user.id === this.$auth.user.id && cu.isLike))
            .map((v) => Club.of(v, this.$auth.user.id))
        })
      )
  }) as Task

  @task
  getClub = (async (id: number) => {
    await api.get<IClubDto>(`/v1/clubs/${id}`).then(
      action((data) => {
        this.club = Club.of(data, this.$auth.user.id!)
      })
    )
  }) as TaskBy<number>

  @task
  getClubForm = (async (_id: number) => {
    await this.getClub(_id)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images: any = await Promise.all(this.club.imageUrls.map((v) => urlToFile(v)))

    this.setForm({
      ...this.club,
      images,
    })
  }) as TaskBy<number>

  @task.resolved
  insertClub = (async (form: IClubForm) => {
    const formData = new FormData()

    formData.append(
      'clubReqDto',
      new Blob(
        [
          JSON.stringify({
            communityId: form.communityId,
            name: form.name,
            description: form.description,
            meetingTime: form.meetingTime,
            meetingPlace: form.meetingPlace,
            hashtagNames: form.hashtagNames,
            isPublic: form.isPublic,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    )

    if (form.images.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.images = [(await urlToFile('/assets/img/no-image.png')) as any]
    }

    form.images?.forEach((v) => {
      formData.append('files', v, v.name)
    })

    await api.post(`/v1/clubs`, formData)

    return this.getCreatedClub()
  }) as InsertClubTask

  @task.resolved
  joinClub = (async (payload: IJoinClubDto) => {
    await api.post(`/v1/clubs-users`, {
      ...payload,
      role: 'ROLE_USER',
    })
  }) as JoinClubTask

  @action
  setForm(data: Partial<IClubForm>) {
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
    console.log('reset??')

    this.form = {
      ...initState.form,
    }
  }

  @task.resolved
  toggleLike = (async (id: number, isLike: boolean) => {
    await api.post('/v1/clubs-users/likes', {
      clubId: id,
      isLike,
      isUse: true,
    })

    this.setLike(id, isLike)
  }) as TaskBy2<number, boolean>

  @action
  setLike = (clubId: number, isLike: boolean) => {
    this.club = this.updateClubLike(this.club, clubId, isLike)
    this.popularClubs = this.popularClubs.map((club) => this.updateClubLike(club, clubId, isLike))
    this.recentClubs = this.recentClubs.map((club) => this.updateClubLike(club, clubId, isLike))
    this.clubs = this.clubs.map((club) => this.updateClubLike(club, clubId, isLike))
  }

  /**
   * 방금 생성한 클럽을 리턴합니다.
   * TODO: 추후 논의후 클럽 insert후 클럽 객체 리턴하도록 협의필요
   */
  getCreatedClub = async () => {
    const data = await api.get<{ clubs: IClubDto[]; count: number }>(
      `/v1/clubs/users/${this.$auth.user.id}?sort-order=created_at_desc&limit=1`
    )

    return data.clubs.pop()
  }

  updateClubLike = (club: Club, clubId: number, isLike: boolean) =>
    club.id === clubId
      ? {
          ...club,
          isLike,
          likeCount: isLike ? club.likeCount + 1 : club.likeCount - 1,
        }
      : club
}
