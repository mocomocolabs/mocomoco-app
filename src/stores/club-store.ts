import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IClub, IClubForm } from '../models/club'
import { api } from '../services/api-service'
import { storage } from '../services/storage-service'
import { urlToFile } from '../utils/image-util'
import { IClubDto, InsertClubTask } from './club-store.d'
import { Task, TaskByNumber } from './task'
import { User } from './user-store'

const initState = {
  club: {} as IClub,
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

export class Club {
  @observable.ref popularClubs: IClub[] = []
  @observable.ref recentClubs: IClub[] = []
  @observable.ref club: IClub = initState.club
  @observable.struct form: IClubForm = initState.form

  $user: User

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
          this.popularClubs = data.clubs.map((v) => ({
            ...v,
            community: {
              ...v.community,
              bannerUrl: v.community.atchFiles[0]?.url,
            },
            members: v.clubUsers.map((v) => v.user as any), // TODO: IUser 확정시 any제거
            isMember: !!v.clubUsers.findIndex((v) => v.user.id === this.$user.currentUserId),
            imageUrls: v.atchFiles.map((v) => v.url),
            hashtagNames: v.clubHashtags.map((v) => v.hashtag.name),
          }))
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
          this.recentClubs = data.clubs.map((v) => ({
            ...v,
            community: {
              ...v.community,
              bannerUrl: v.community.atchFiles[0]?.url,
            },
            members: v.clubUsers.map((v) => v.user as any), // TODO: IUser 확정시 any제거
            isMember: !!v.clubUsers.findIndex((v) => v.user.id === this.$user.currentUserId),
            imageUrls: v.atchFiles.map((v) => v.url),
            hashtagNames: v.clubHashtags.map((v) => v.hashtag.name),
          }))
        })
      )
  }) as Task

  @task
  getClub = (async (id: number) => {
    // action(() => {
    //   this.club = {
    //     id: 1,
    //     name: '이랑 팬클럽',
    //     description: `또 사람 죽는 것처럼 울었지
    //   인천 공항에서도 나리타 공항에서도
    //   울지 말라고 서로 힘내서 약속 해놓고..`,
    //     meetingTime: '언제나 함께',
    //     meetingPlace: '유튜브 Live',
    //     community: { id: 1, name: '진강산 공동체', count: 5, bannerUrl: '/assets/mock/content1.jpeg' },
    //     imageUrls: ['/assets/mock/content1.jpeg'],
    //     isMember: true,
    //     members: [],
    //     createdAt: '20210203122311',
    //     isPublic: false,
    //     hashtagNames: [],
    //   }
    // })
    // await http.get<IClub>(`/clubs/${id}`).then(
    //   action((data) => {
    //     this.club = data
    //   })
    // )
  }) as TaskByNumber

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
  }) as TaskByNumber

  @task.resolved
  insertClub = (async (form: IClubForm) => {
    const formData = new FormData()

    formData.append(
      'clubReqDto',
      new Blob(
        [
          JSON.stringify({
            communityId: storage.communityId,
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
