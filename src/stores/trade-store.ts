import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { ITrade } from '../models/trade'
import { http } from '../utils/http-util'
import { TaskByNumber } from './task'
import { TaskByString } from './task.d'

const initState = {
  items: [],
  /* eslint-disable */
  item: {} as any,
}

export abstract class TradeStore {
  @observable.struct items: ITrade[] = initState.items
  @observable.struct item: ITrade = initState.item

  protected abstract _path: string

  get path() {
    return this._path
  }

  @task
  getItems = (async (keyword) => {
    await http
      .get<ITrade[]>(`/${this.path}`, {
        params: {
          keyword: keyword,
        },
      })
      .then(
        action((data) => {
          this.items = data
        })
      )
  }) as TaskByString

  @task
  getItemsLegacy = (async (keyword?) => {
    await http
      .get<ITrade[]>(`/${this.path}`, {
        params: {
          keyword: keyword,
        },
      })
      .then(
        action((data) => {
          this.items = data
        })
      )
  }) as TaskByString

  @task
  getItem = (async (id: number) => {
    await http.get<ITrade>(`/${this.path}/${id}`).then(
      action((data) => {
        this.item = data
      })
    )
  }) as TaskByNumber

  @task.resolved
  deleteItem = (async (id: number) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.delete(`/${this.path}/${id}`)
  }) as TaskByNumber
}

export class Stuff extends TradeStore {
  protected _path = 'stuffs'
}

export class Talent extends TradeStore {
  protected _path = 'talents'
}
