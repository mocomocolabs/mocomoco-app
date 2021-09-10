import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { Community } from '../models/community'
import { ICommunity } from '../models/community.d'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { AuthStore } from './auth-store'
import { ICommunityDto } from './community-store.d'
import { Task } from './task'

const initState = {
  selectedId: 0,
  communities: [],
}

export const allCommunity = {
  id: null,
  name: '모든 마을',
  userCount: 0,
  bannerUrl: '',
}

export class CommunityStore {
  @observable.ref communities: ICommunity[] = initState.communities
  @observable selectedId: number | null = storage.communityId

  $auth: AuthStore

  constructor(rootStore: RootStore) {
    this.$auth = rootStore.$auth
  }

  @task
  getCommunities = (async () => {
    await http.get<{ communities: ICommunityDto[] }>('/v1/communities?is-use=true').then(
      action((data) => {
        this.communities = data.communities.map((v: ICommunityDto) => Community.of(v))
      })
    )
  }) as Task

  @action
  setSelectedId(id: number | null) {
    this.selectedId = id
    storage.setCommunityId(id)
  }

  @computed
  get community() {
    return this.communities.find((v) => v.id === this.selectedId) || allCommunity
  }

  @computed
  get myCommunity() {
    return this.communities.find((v) => v.id === this.$auth.user.communityId)
  }
}
