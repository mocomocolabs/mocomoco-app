import { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { StuffTalent } from '../models/stufftalent'
import {
  IStuffTalent,
  IStuffTalentFilter,
  IStuffTalentForm,
  StuffTalentPathName as PathName,
  StuffTalentStatus,
  StuffTalentType,
} from '../models/stufftalent.d'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import {
  InsertStuffTalentTask,
  IStuffsTalentsDto,
  IStuffTalentCategoryDto,
  IStuffTalentDto,
  StuffTalentPath,
} from './stufftalent-store.d'
import { TaskBy, TaskBy2 } from './task'

const paths: StuffTalentPath = {
  [PathName.STUFF]: 'stuffs',
  [PathName.TALENT]: 'talents',
}

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

// TODO stuff, talent 차이점 모음 => class 분리하자
/*
  get data api path: /stuffs, /talents
  response data name: stuffs, talents
  like-users property name : stuffUsers, talentUsers
  insert data file name: stuffReqDto, talentReqDto
  toggle like api path: stuffs-users/likes, talents-users/likes
  */
export class StuffTalentStore {
  @observable.struct items: IStuffTalent[] = initState.items
  @observable.struct item: IStuffTalent = initState.item
  @observable.struct categories: IStuffTalentCategoryDto[] = initState.categories
  @observable.struct form: IStuffTalentForm = initState.form

  readonly statuses: StuffTalentStatus[] = Object.values(StuffTalentStatus)
  readonly types: StuffTalentType[] = Object.values(StuffTalentType)

  readonly url: string
  readonly categoriesUrl = `/categories`

  readonly pathName: PathName

  constructor(pathName: PathName) {
    this.pathName = pathName
    this.url = `/${paths[pathName]}`
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
    await api.get<IStuffsTalentsDto>(this.url, this.config(search, filter)).then(
      action((data) => {
        this.items = (this.pathName === PathName.STUFF ? data.stuffs : data.talents).map((item) =>
          StuffTalent.of(item, this.pathName)
        )
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
    await api.get<IStuffTalentDto>(`${this.url}/${id}`).then(
      action((data) => {
        this.item = StuffTalent.of(data, this.pathName)
      })
    )
  }) as TaskBy<number>

  @task.resolved
  deleteItem = (async (id: number) => {
    await api.patch(`${this.url}/${id}/is-use`) // WARN this is toggle
  }) as TaskBy<number>

  @task.resolved
  insertItem = (async (form: IStuffTalentForm, isUpdate: boolean) => {
    const formData = new FormData()

    formData.append(
      `${_.lowerCase(this.pathName)}ReqDto`,
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
            isExchangable: form.isExchangeable,
            isNegotiable: form.isNegotiable,
            isPublic: form.isPublic,
            isUse: true,
          }),
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

    isUpdate ? await api.put(this.url, formData) : await api.post(this.url, formData)
    this.resetForm()
  }) as InsertStuffTalentTask

  @task
  getForm = (async (_id: number) => {
    await this.getItem(_id)

    const images: ImageUploadItem[] = (await Promise.all(
      this.item.imageUrls.map((v) => urlToFile(v))
    )) as ImageUploadItem[]

    this.setForm({
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
