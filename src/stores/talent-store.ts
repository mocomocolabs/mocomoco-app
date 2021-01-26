import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { http } from '../utils/http-util'
import { ITalent, ITalents } from './../models/talent.d'
import { TaskByNumber, TaskByString } from './task'

const initState = {
  items: [],
  item: {} as ITalent,
}

export class Talent {
  @observable.struct items: ITalent[] = initState.items
  @observable.struct item: ITalent = initState.item

  url = `http://localhost:8080/api/v1/talents`

  @task
  getItems = (async (keyword) => {
    await http
      .get<ITalents>(this.url, {
        params: {
          title: 'like:' + keyword,
        },
      })
      .then(
        action((data) => {
          this.items = data.talents
        })
      )
  }) as TaskByString

  @task
  getItem = (async (id: number) => {
    await http.get<ITalent>(`${this.url}/${id}`).then(
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
