import _ from 'lodash'
import { ICommunityDto } from '../stores/community-store.d'
import { ICommunity } from './community.d'
import { User } from './user'

export class Community {
  static of(dto: ICommunityDto): ICommunity {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          users: dto.users?.map((u) => User.of(u)),
          userCount: dto.users?.filter((u) => u.isUse).length ?? 0,
          bannerUrl: dto.atchFiles?.[0]?.url,
        }
      : ({} as ICommunity)
  }
}
