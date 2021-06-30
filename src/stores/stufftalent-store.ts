import { AxiosRequestConfig } from 'axios'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
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
import { getKeyValue } from '../utils/type-util'
import {
  ICreateChatDto,
  InsertStuffTalentTask,
  IStuffsTalentsDto,
  IStuffTalentCategoryDto,
  IStuffTalentDto,
  IStuffTalentInsertReqDto,
} from './stufftalent-store.d'
import { TaskBy, TaskBy2 } from './task'

const initState = {
  items: [],
  item: {} as IStuffTalent,
  categories: [] as IStuffTalentCategoryDto[],
  form: {
    status: StuffTalentStatus.AVAILABLE,
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

  constructor(pathName: PageKey) {
    this.predefined = predefined.find((p) => p.pageKey === pathName) || predefined[0]
    this.getCategoriesBy(pathName)
  }

  @task
  getCategoriesBy = (async (pathName: string) => {
    const config = {
      params: {
        'type': pathName,
        'is-use': true,
      },
    }

    await api.get<{ categories: IStuffTalentCategoryDto[] }>(this.categoriesUrl, config).then(
      action((data) => {
        this.categories = data.categories
      })
    )
  }) as TaskBy<string>

  @task
  getItems = (async (search, filter) => {
    await api.get<IStuffsTalentsDto>(this.predefined.baseApi, this.config(search, filter)).then(
      action((data) => {
        this.items = getKeyValue(
          data,
          this.predefined.getItemsProperty as keyof IStuffsTalentsDto
        ).map((item) => StuffTalent.of(item, this.predefined))
      })
    )
  }) as TaskBy2<string, IStuffTalentFilter>

  private config = (search: string, filter: IStuffTalentFilter) => {
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

    if (isPublic) {
      this.addParam(config, 'is-public', isPublic)
    } else {
      !!communityId && this.addParam(config, 'community-id', communityId)
    }

    !!search && this.addParam(config, 'title', 'like:' + search)

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
        this.item = StuffTalent.of(data, this.predefined)
      })
    )
  }) as TaskBy<number>

  @task.resolved
  deleteItem = (async (id: number) => {
    await api.patch(`${this.predefined.baseApi}/${id}/is-use`) // WARN this is toggle
  }) as TaskBy<number>

  @task.resolved
  insertItem = (async (form: IStuffTalentForm, isUpdate: boolean) => {
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

    if (form.images.length === 0) {
      // TODO: empty image 추가 => db에 넣지 말고, images 프로퍼티가 비어 있으면 화면에서 empty image를 표시하는게 어떨까?
      // db에 넣어놓으면, 수정화면에서 empty image인지 구분할 방법이 없다.
      form.images = [(await urlToFile('/assets/img/stuff/stuff01.jpg')) as ImageUploadItem]
    }

    form.images?.forEach((v) => {
      formData.append('files', v)
    })

    if (isUpdate) {
      await api.put(this.predefined.baseApi, formData)
      this.resetUpdateForm()
    } else {
      await api.post(this.predefined.baseApi, formData)
      this.resetForm()
    }
  }) as InsertStuffTalentTask

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
  setLike(id: number, isLike: boolean) {
    // TODO store의 현재 items와 item 데이터를 둘다 갱신해야 돼서 이렇게 구현했는데, 보기에 개운하지 않음.
    const found = this.item.id === id ? this.item : this.items.find((v) => v.id === id)

    if (found) {
      const likeCount = isLike ? found.likeCount + 1 : found.likeCount - 1

      this.items = this.items.map((v) => {
        return v.id === id ? { ...found!, isLike, likeCount } : v
      })

      this.item = this.item.id === id ? { ...this.item, isLike, likeCount } : this.item
    }
  }

  @task
  getUpdateForm = (async (_id: number) => {
    await this.getItem(_id)

    const images: ImageUploadItem[] = (await Promise.all(
      this.item.imageUrls.map((v) => urlToFile(v))
    )) as ImageUploadItem[]

    this.setUpdateForm({
      ...this.item,
      communityId: this.item.community.id,
      categoryId: this.item.category.id,
      images,
    })
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
