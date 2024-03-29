import { AxiosRequestConfig } from 'axios'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { StuffTalent } from '../models/stufftalent'
import {
  IStuffTalent,
  IStuffTalentFilter,
  IStuffTalentForm,
  StuffTalentPageKey as PageKey,
  StuffTalentStatus,
  StuffTalentType,
} from '../models/stufftalent.d'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import { AuthStore } from './auth-store'
import {
  ICreateChatDto,
  IStuffsTalentsDto,
  IStuffTalentCategoryDto,
  IStuffTalentDto,
  IStuffTalentInsertReqDto,
} from './stufftalent-store.d'
import { Task, TaskBy, TaskBy2, TaskBy2As } from './task'

const initState = {
  items: [],
  item: {} as IStuffTalent,
  categories: [] as IStuffTalentCategoryDto[],
  form: {
    status: StuffTalentStatus.AVAILABLE,
    title: '',
    content: '',
    price: 0,
    exchangeText: '',
    isExchangeable: false,
    isNegotiable: false,
    isPublic: false,
    images: [] as ImageUploadItem[],
  } as IStuffTalentForm,
}

export interface IStuffTalentPredefined {
  pageKey: PageKey
  baseApi: string
  toggleLikeApi: string
  createChatApi: string
  stuffTalentIdProperty: string
  stuffTalentUsersProperty: string
  getItemsProperty: string
  insertItemReqDto: string
  chatroomProperty: string
}

const apiVer = 'v1'

const predefined: IStuffTalentPredefined[] = [
  {
    pageKey: PageKey.STUFF,
    baseApi: `/${apiVer}/stuffs`,
    toggleLikeApi: `/${apiVer}/stuffs-users/likes`,
    createChatApi: `/${apiVer}/stuffs-users/chatrooms`,
    stuffTalentIdProperty: 'stuffId',
    stuffTalentUsersProperty: 'stuffUsers',
    getItemsProperty: 'stuffs',
    insertItemReqDto: 'stuffReqDto',
    chatroomProperty: 'stuff',
  },
  {
    pageKey: PageKey.TALENT,
    baseApi: `/${apiVer}/talents`,
    toggleLikeApi: `/${apiVer}/talents-users/likes`,
    createChatApi: `/${apiVer}/talents-users/chatrooms`,
    stuffTalentIdProperty: 'talentId',
    stuffTalentUsersProperty: 'talentUsers',
    getItemsProperty: 'talents',
    insertItemReqDto: 'talentReqDto',
    chatroomProperty: 'talent',
  },
]

export class StuffTalentStore {
  @observable.struct items: IStuffTalent[] = initState.items
  @observable.struct item: IStuffTalent = initState.item
  @observable.struct categories: IStuffTalentCategoryDto[] = initState.categories
  @observable.struct form: IStuffTalentForm = initState.form
  @observable.struct updateForm: IStuffTalentForm = initState.form

  readonly statuses: StuffTalentStatus[] = Object.values(StuffTalentStatus)
  readonly types: StuffTalentType[] = Object.values(StuffTalentType)

  readonly categoriesUrl = `/${apiVer}/categories`

  readonly predefined: IStuffTalentPredefined

  $auth: AuthStore

  constructor(pathName: PageKey, rootStore: RootStore) {
    this.$auth = rootStore.$auth
    this.predefined = predefined.find((p) => p.pageKey === pathName) || predefined[0]
  }

  @task
  getCategories = (async () => {
    const config = {
      params: {
        'type': this.predefined.pageKey,
        'is-use': true,
        'sort-order': 'created-at_asc',
      },
    }

    await api.get<{ categories: IStuffTalentCategoryDto[] }>(this.categoriesUrl, config).then(
      action((data) => {
        this.categories = data.categories
      })
    )
  }) as Task

  @task
  getItems = (async (search, filter) => {
    await api
      .get<IStuffsTalentsDto>(this.predefined.baseApi, this.config(search, filter, 'created-at_desc'))
      .then(
        action((data) => {
          this.items = (
            data[this.predefined.getItemsProperty as keyof IStuffsTalentsDto] as IStuffTalentDto[]
          )
            .filter((item) => filter.isLike === undefined || item.isLike === filter.isLike)
            .map((item) => StuffTalent.of(item, this.predefined.pageKey, this.$auth.user.id))
        })
      )
  }) as TaskBy2<string, IStuffTalentFilter>

  private config = (search: string, filter: IStuffTalentFilter, sortOrder?: string) => {
    const { userId, categories, notStatuses, types, isPublic, communityId } = filter

    const config: AxiosRequestConfig = {
      params: {
        'is-use': true,
      },
    }

    !!userId && this.addParam(config, 'user-id', userId)
    categories?.length > 0 && this.addParam(config, 'category-id', categories.join('_OR_'))
    notStatuses?.length > 0 &&
      this.addParam(config, 'status', notStatuses.map((s) => 'not:' + s).join('_OR_'))
    types?.length > 0 && this.addParam(config, 'type', types.join('_OR_'))

    this.addParam(config, 'is-public', isPublic)
    !!communityId && this.addParam(config, 'community-id', communityId)

    !!search && this.addParam(config, 'title', 'like:' + search)

    !!sortOrder && this.addParam(config, 'sort-order', sortOrder)
    this.addParam(config, 'limit', filter.limit)
    return config
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private addParam(options: AxiosRequestConfig, name: string, value: any) {
    options.params = {
      ...options.params,
      [name]: value,
    }
  }

  @task
  getItem = (async (id: number) => {
    await api.get<IStuffTalentDto>(`${this.predefined.baseApi}/${id}`).then(
      action((data) => {
        this.item = StuffTalent.of(data, this.predefined.pageKey, this.$auth.user.id)
      })
    )
  }) as TaskBy<number>

  @task.resolved
  deleteItem = (async (id: number) => {
    await api.patch(`${this.predefined.baseApi}/${id}/is-use`) // WARN this is toggle
  }) as TaskBy<number>

  createInsertFormData = async (form: IStuffTalentForm) => {
    if (form.images.length === 0)
      throw new Error('설명이 잘 전달될 수 있도록<br />사진을 한 장 이상 추가해주세요 :)')

    const formData = new FormData()

    formData.append(
      this.predefined.insertItemReqDto,
      new Blob(
        [
          JSON.stringify({
            id: form.id,
            communityId: form.communityId,
            status: form.status,
            type: form.type,
            categoryId: form.categoryId,
            title: form.title,
            content: form.content,
            price: form.price,
            exchangeText: form.exchangeText,
            isExchangeable: form.isExchangeable,
            isNegotiable: form.isNegotiable,
            isPublic: form.isPublic,
            isUse: true,
          } as IStuffTalentInsertReqDto),
        ],
        {
          type: 'application/json',
        }
      )
    )

    form.images.forEach((v) => {
      formData.append('files', v, v.name)
    })

    return formData
  }

  @task.resolved
  insertItem = (async (form: IStuffTalentForm, isUpdate: boolean) => {
    const formData = await this.createInsertFormData(form)
    if (isUpdate) {
      await api.put(this.predefined.baseApi, formData)
      return { id: form.id }
    } else {
      await api.post(this.predefined.baseApi, formData)
      return this.getCreatedItem()
    }
  }) as TaskBy2As<Partial<IStuffTalentForm>, boolean, IStuffTalent>

  /**
   * 방금 생성한 아이템을 리턴합니다.
   * TODO: 추후 insert후 새로 생성된 객체 리턴하도록 협의필요
   */
  getCreatedItem = async () => {
    const data = await api.get<IStuffsTalentsDto>(
      `${this.predefined.baseApi}?user-id=${this.$auth.user.id}&sort-order=created-at_desc&limit=1`
    )

    const items = data[this.predefined.getItemsProperty as keyof IStuffsTalentsDto]
    return items.pop()
  }

  @task.resolved
  updateItemStatus = (async (id: number, status: StuffTalentStatus) => {
    const formData = new FormData()

    formData.append(
      this.predefined.insertItemReqDto,
      new Blob(
        [
          JSON.stringify({
            id: id,
            status: status,
            isUse: true,
          } as IStuffTalentInsertReqDto),
        ],
        {
          type: 'application/json',
        }
      )
    )

    await api.patch(`${this.predefined.baseApi}`, formData)
  }) as TaskBy2<number, StuffTalentStatus>

  @task.resolved
  toggleLike = (async (id: number, isLike: boolean) => {
    await api.post(this.predefined.toggleLikeApi, {
      [`${this.predefined.stuffTalentIdProperty}`]: id,
      isLike,
      isUse: true,
    })

    this.setLike(id, isLike)
  }) as TaskBy2<number, boolean>

  @action
  setLike = (itemId: number, isLike: boolean) => {
    this.item = this.updateItemLike(this.item, itemId, isLike)
    this.items = this.items.map((item) => this.updateItemLike(item, itemId, isLike))
  }

  updateItemLike = (item: IStuffTalent, feedId: number, isLike: boolean) =>
    item.id === feedId
      ? {
          ...item,
          isLike,
          likeCount: isLike ? item.likeCount + 1 : item.likeCount - 1,
        }
      : item

  @task
  getUpdateForm = (async (_id: number) => {
    await api.get<IStuffTalentDto>(`${this.predefined.baseApi}/${_id}`).then(
      action(async (data) => {
        const item = StuffTalent.of(data, this.predefined.pageKey, this.$auth.user.id)

        const images: ImageUploadItem[] = (await Promise.all(
          item.imageUrls.map((v) => urlToFile(v))
        )) as ImageUploadItem[]

        this.setUpdateForm({
          ...item,
          communityId: item.community.id,
          categoryId: item.category.id,
          images,
        })
      })
    )
  }) as TaskBy<number>

  @action
  setForm(data: Partial<IStuffTalentForm>) {
    this.form = {
      ...this.form,
      ...data,
    }
  }

  @action
  resetForm() {
    this.form = initState.form
  }

  @action
  setUpdateForm(data: Partial<IStuffTalentForm>) {
    this.updateForm = {
      ...this.updateForm,
      ...data,
    }
  }

  @action
  resetUpdateForm() {
    this.updateForm = initState.form
  }

  @task.resolved
  createChat = (async (payload: ICreateChatDto) => {
    await api
      .post(this.predefined.createChatApi, {
        ...payload,
        isUse: true,
      })
      .catch(({ status }) => console.error('createChat response status:', status))
  }) as TaskBy<ICreateChatDto>
}
