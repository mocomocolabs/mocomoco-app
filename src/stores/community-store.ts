import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { ICommunity } from '../models/community'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { ICommunityDto } from './community-store.d'
import { Task } from './task'

const initState = {
  selectedId: 0,
  communities: [],
}

export class Community {
  @observable.ref communities: ICommunity[] = initState.communities
  @observable selectedId: number = storage.communityId

  @task
  getCommunities = (async () => {
    await http.get<{ communities: ICommunityDto[] }>('http://localhost:8080/api/v1/communities').then(
      action((data) => {
        this.communities = data.communities.map((v: ICommunityDto) => ({
          ...v,
          bannerUrl: v.atchFiles[0]?.url,
        }))
      })
    )
  }) as Task

  @action
  setSelectedId(id: number) {
    this.selectedId = id
    storage.setCommunityId(id)
  }

  @computed
  get community() {
    return this.communities.find((v) => v.id === this.selectedId)
  }
}
