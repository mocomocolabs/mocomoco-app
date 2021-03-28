import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IStuff, IStuffCategories, IStuffCategory, IStuffs, IStuffTalentFilter } from '../models/stuff'
import { api } from '../services/api-service'
import { http } from '../utils/http-util'
import { TaskBy, TaskBy2 } from './task'

const initState = {
  items: [],
  item: {} as IStuff,
  categories: [] as IStuffCategory[],
}

export class Stuff {
  @observable.struct items: IStuff[] = initState.items
  @observable.struct item: IStuff = initState.item
  @observable.struct categories: IStuffCategory[] = initState.categories

  readonly status = ['AVAILABLE', 'RESERVED', 'FINISH']

  readonly url = `http://localhost:8080/api/v1/stuffs`
  readonly categories_url = `http://localhost:8080/api/v1/categories`

  constructor() {
    this.getCategories()
  }

  @task
  getCategories = async () => {
    const config = {
      params: {
        type: 'STUFF',
      },
    }

    await http.get<IStuffCategories>(this.categories_url, config).then(
      action((data) => {
        this.categories = data.categories
      })
    )
  }

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

    await http.get<IStuffs>(this.url, config).then(
      action((data) => {
        this.items = data.stuffs
      })
    )
  }) as TaskBy2<string, IStuffTalentFilter>

  @task
  getItem = (async (id: number) => {
    await http.get<IStuff>(`${this.url}/${id}`).then(
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
