import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import {
  IStuffTalent,
  IStuffTalentFilter,
  StuffTalentPathName as PathName,
  StuffTalentStatus as Status,
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

  readonly status: string[] = Object.values(Status)

  readonly baseUrl: string = 'http://localhost:8080/api/v1'
  readonly url: string
  readonly categoriesUrl = `${this.baseUrl}/categories`

  readonly pathName: PathName

  constructor(pathName: PathName) {
    this.pathName = pathName
    this.url = `${this.baseUrl}/${paths[pathName]}`
    this.getCategoriesBy(pathName)
  }

  @task
  getCategoriesBy = (async (pathName: string) => {
    const config = {
      params: {
        type: pathName,
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
    const titleParam = 'like:' + search
    const categoryIdParam = filter.categories.join('_OR_')
    const statusParam = filter.statuses.join('_OR_')

    const config = {
      params: {
        'title': titleParam,
        'category-id': categoryIdParam,
        'status': statusParam,
        'is-use': true,
      },
    }

    await api.get<IStuffsTalentsDto>(this.url, config).then(
      action((data) => {
        this.items = this.pathName === PathName.STUFF ? data.stuffs : data.talents
      })
    )
  }) as TaskBy2<string, IStuffTalentFilter>

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
