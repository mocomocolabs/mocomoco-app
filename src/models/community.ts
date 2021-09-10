import _ from 'lodash'
import { ICommunityDto } from '../stores/community-store.d'
import { ICommunity } from './community.d'

export class Community {
  static of(dto: ICommunityDto): ICommunity {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          bannerUrl: dto.atchFiles?.[0]?.url,
        }
      : ({} as ICommunity)
  }
}
