import { AxiosRequestConfig } from 'axios'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import {
  IStuffTalent,
  IStuffTalentFilter,
  StuffTalentPathName as PathName,
  StuffTalentStatus,
  StuffTalentType,
} from '../models/stufftalent.d'
import { api } from '../services/api-service'
import {
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
}

export class StuffTalentStore {
  @observable.struct items: IStuffTalent[] = initState.items
  @observable.struct item: IStuffTalent = initState.item
  @observable.struct categories: IStuffTalentCategoryDto[] = initState.categories

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
        this.items = this.pathName === PathName.STUFF ? data.stuffs : data.talents
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
        this.item = data
      })
    )
  }) as TaskBy<number>

  @task.resolved
  deleteItem = (async (id: number) => {
    await api.patch(`${this.url}/${id}/is-use`) // WARN this is toggle
  }) as TaskBy<number>
}
