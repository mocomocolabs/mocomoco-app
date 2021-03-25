import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IStuffTalentFilter } from '../models/stuff'
import { http } from '../utils/http-util'
import { ITalent, ITalentCategories, ITalentCategory, ITalents } from './../models/talent.d'
import { TaskBy, TaskBy2 } from './task'

const initState = {
  items: [],
  item: {} as ITalent,
  categories: [] as ITalentCategory[],
}

export class Talent {
  @observable.struct items: ITalent[] = initState.items
  @observable.struct item: ITalent = initState.item
  @observable.struct categories: ITalentCategory[] = initState.categories

  readonly status = ['AVAILABLE', 'RESERVED', 'FINISH']

  readonly url = `http://localhost:8080/api/v1/talents`
  readonly categories_url = `http://localhost:8080/api/v1/categories`

  constructor() {
    this.getCategories()
  }

  @task
  getCategories = async () => {
    const config = {
      params: {
        type: 'TALENT',
      },
    }

    await http.get<ITalentCategories>(this.categories_url, config).then(
      action((data) => {
        this.categories = data.categories
        console.log(`categories = ${this.categories.length}`)
      })
    )
  }

  @task
  getItems = (async (search, filter) => {
    const titleParam = 'like:' + search
    const categoryIdParam = filter.category.join('_OR_')
    const statusParam = filter.status.join('_OR_')

    const config = {
      params: {
        'title': titleParam,
        'category-id': categoryIdParam,
        'status': statusParam,
      },
    }

    await http.get<ITalents>(this.url, config).then(
      action((data) => {
        this.items = data.talents
      })
    )
  }) as TaskBy2<string, IStuffTalentFilter>

  @task
  getItem = (async (id: number) => {
    await http.get<ITalent>(`${this.url}/${id}`).then(
      action((data) => {
        this.item = data
      })
    )
  }) as TaskBy<number>

  @task.resolved
  deleteItem = (async (id: number) => {
    await new Promise((r) => setTimeout(r, 1000))
    await http.delete(`${this.url}/${id}`)
  }) as TaskBy<number>
}
