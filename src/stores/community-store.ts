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
  @observable.ref communities: ICommunity[] = initState.communities
  // TODO: API 협의 후 적절한 store로 이동, DB에 저장할 필요는 없을듯 함.
  @observable selectedId: number = initState.selectedId

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
  get community() {
    return this.communities.find((v) => v.id === this.selectedId)
  }
}
