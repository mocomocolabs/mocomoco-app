import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IStuff } from '../models/stuff'
import { http } from '../utils/http-util'
import { Task, TaskByNumber } from './task'

const initState = {
  stuffs: [],
  /* eslint-disable */
  stuff: {} as any,
}

export class Stuff {
  @observable.struct stuffs: IStuff[] = initState.stuffs
  @observable.struct stuff: IStuff = initState.stuff

  @task
  getStuffs = (async () => {
    await http.get<IStuff[]>('/stuffs').then(
      action((data) => {
        this.stuffs = data
      })
    )
  }) as Task

  @task
  getStuff = (async (id: number) => {
    await http.get<IStuff>(`/stuffs/${id}`).then(
      action((data) => {
        this.stuff = data
      })
    )
  }) as TaskByNumber

  @task.resolved
  deleteStuff = (async (id: number) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.delete(`/stuffs/${id}`)
  }) as TaskByNumber
}
