import _ from 'lodash'
import { ICommunityDto } from '../stores/community-store.d'
import { ICommunity } from './community.d'
import { SIGN_UP_STATUS } from './sign-up.d'
import { User } from './user'

export class Community {
  static of(dto: ICommunityDto): ICommunity {
    if (!!!dto || _.isEmpty(dto)) {
      return {} as ICommunity
    }

    const approvedUsers = dto.users?.filter((u) => u.isUse && u.status === SIGN_UP_STATUS.승인)

    return {
      ...dto,
      users: approvedUsers?.map((u) => User.of(u)),
      userCount: approvedUsers?.length ?? 0,
      bannerUrl: dto.atchFiles?.[0]?.url,
    }
  }
}
