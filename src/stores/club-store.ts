import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { Club } from '../models/club'
import { IClubForm } from '../models/club.d'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import { IClubDto, InsertClubTask } from './club-store.d'
import { Task, TaskBy } from './task'
import { UserStore } from './user-store'

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
  @observable.ref club: Club
  @observable.struct form: IClubForm = initState.form

  $user: UserStore

  constructor(rootStore: RootStore) {
    this.$user = rootStore.$user
  }

  @task
  getPopularClubs = (async () => {
    // TODO: 페이징 처리 추후 구현
    await api
      .get<{ clubs: IClubDto[]; count: number }>(
        `http://localhost:8080/api/v1/clubs?sort-order=popular&limit=999`
      )
      .then(
        action((data) => {
          this.popularClubs = data.clubs.map((v) => Club.of(v, this.$user.currentUserId!))
        })
      )
  }) as Task

  @task
  getRecentClubs = (async () => {
    // TODO: 페이징 처리 추후 구현
    await api
      .get<{ clubs: IClubDto[]; count: number }>(
        `http://localhost:8080/api/v1/clubs?sort-order=created_at_desc&limit=999`
      )
      .then(
        action((data) => {
          this.recentClubs = data.clubs.map((v) => Club.of(v, this.$user.currentUserId!))
        })
      )
  }) as Task

  @task
  getClub = (async (id: number) => {
    await api.get<IClubDto>(`http://localhost:8080/api/v1/clubs/${id}`).then(
      action((data) => {
        this.club = Club.of(data, this.$user.currentUserId!)
      })
    )
  }) as TaskBy<number>

  @task
  getClubForm = (async (_id: number) => {
    await this.getClub(_id)
    const images: any = await Promise.all(this.club.imageUrls.map((v) => urlToFile(v)))
    const { id, description, meetingTime, meetingPlace, isPublic } = this.club
    this.setForm({
      id,
      description,
      meetingTime,
      meetingPlace,
      isPublic,
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

    form.images?.forEach((v) => {
      formData.append('files', v)
    })

    await api.post(`http://localhost:8080/api/v1/clubs`, formData)
    this.resetForm()
  }) as InsertClubTask

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
    this.form = initState.form
  }
}
