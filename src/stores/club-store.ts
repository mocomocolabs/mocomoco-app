import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IClub, IClubForm } from '../models/club'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import { InsertClubTask } from './club-store.d'
import { Community } from './community-store'
import { Task, TaskByNumber } from './task'

const initState = {
  clubs: [],
  club: {} as IClub,
  form: {
    communityId: 0,
    name: '',
    meetingTime: '',
    meetingPlace: '',
    description: '',
    images: [],
    isPublic: false,
    hashtags: [],
  },
}

export class Club {
  @observable.ref clubs: IClub[] = initState.clubs
  @observable.ref club: IClub = initState.club
  @observable.struct form: IClubForm = initState.form

  $community: Community

  constructor(rootStore: RootStore) {
    this.$community = rootStore.$community
  }

  @task
  getClubs = (async () => {
    action(() => {
      this.clubs = [
        {
          id: 1,
          name: '이랑 팬클럽',
          description: `또 사람 죽는 것처럼 울었지
      인천 공항에서도 나리타 공항에서도
      울지 말라고 서로 힘내서 약속 해놓고..`,
          meetingTime: '언제나 함께',
          meetingPlace: '유튜브 Live',
          community: { id: 1, name: '진강산 공동체', count: 5, bannerUrl: '/assets/mock/content1.jpeg' },
          imageUrls: ['/assets/mock/content1.jpeg'],
          isMember: true,
          members: [],
          createdAt: '20210203122311',
          isPublic: false,
        },
        {
          id: 1,
          name: '이랑 팬클럽',
          description: `또 사람 죽는 것처럼 울었지
      인천 공항에서도 나리타 공항에서도
      울지 말라고 서로 힘내서 약속 해놓고..`,
          meetingTime: '언제나 함께',
          meetingPlace: '유튜브 Live',
          community: { id: 1, name: '진강산 공동체', count: 5, bannerUrl: '/assets/mock/content1.jpeg' },
          imageUrls: ['/assets/mock/content1.jpeg'],
          isMember: true,
          members: [],
          createdAt: '20210203122311',
          isPublic: false,
        },
      ]
    })
    // await http.get<IClub[]>('/clubs').then(
    //   action((data) => {
    //     this.clubs = data
    //   })
    // )
  }) as Task

  @task
  getClub = (async (id: number) => {
    action(() => {
      this.club = {
        id: 1,
        name: '이랑 팬클럽',
        description: `또 사람 죽는 것처럼 울었지
      인천 공항에서도 나리타 공항에서도
      울지 말라고 서로 힘내서 약속 해놓고..`,
        meetingTime: '언제나 함께',
        meetingPlace: '유튜브 Live',
        community: { id: 1, name: '진강산 공동체', count: 5, bannerUrl: '/assets/mock/content1.jpeg' },
        imageUrls: ['/assets/mock/content1.jpeg'],
        isMember: true,
        members: [],
        createdAt: '20210203122311',
        isPublic: false,
      }
    })
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
    // await new Promise((r) => setTimeout(() => r(1), 1000))
    const formData = new FormData()

    formData.append(
      'clubReqDto',
      new Blob(
        [
          JSON.stringify({
            communityId: this.$community.selectedId,
            description: form.description,
            meetingTime: form.meetingTime,
            meetingPlace: form.meetingPlace,
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

    await api.post(`http://localhost:8080/v1/clubs`, formData)
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
