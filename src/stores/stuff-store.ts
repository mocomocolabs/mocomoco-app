import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { http } from '../utils/http-util'
import { IStuff, IStuffs } from './../models/stuff.d'
import { TaskByNumber } from './task'
import { TaskByString } from './task.d'

const initState = {
  items: [],
  item: {} as IStuff,
}

export class Stuff {
  @observable.struct items: IStuff[] = initState.items
  @observable.struct item: IStuff = initState.item

  url = `http://localhost:8080/api/v1/stuffs`

  @task
  getItems = (async (keyword) => {
    await http
      .get<IStuffs>(this.url, {
        params: {
          title: 'like:' + keyword,
        },
      })
      .then(
        action((data) => {
          this.items = data.stuffs
        })
      )
  }) as TaskByString

  @task
  getItem = (async (id: number) => {
    await http.get<IStuff>(`${this.url}/${id}`).then(
      action((data) => {
        this.item = data
      })
    )
  }) as TaskByNumber

  @task.resolved
  deleteItem = (async (id: number) => {
    await new Promise((r) => setTimeout(r, 1000))
    await http.delete(`${this.url}/${id}`)
  }) as TaskByNumber
}
