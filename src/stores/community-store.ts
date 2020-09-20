import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { ICommunity } from '../models/community'
import { http } from '../utils/http-util'
import { Task } from './task'

const initState = {
  selectedId: 1,
  communities: [],
}

export class Community {
  @observable.shallow communities: ICommunity[] = initState.communities
  @observable selectedId: number = initState.selectedId

  constructor() {}

  @task
  getCommunities = (async () => {
    await http.get<ICommunity[]>('/communities').then(
      action((data) => {
        this.communities = data
      })
    )
  }) as Task

  @action
  setSelectedId(id: number) {
    this.selectedId = id
  }

  @computed
  get selectedCommunity() {
    return this.communities.find((v) => v.id === this.selectedId)
  }
}
