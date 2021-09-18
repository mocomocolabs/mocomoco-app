import type { ICommunityDto } from '../stores/community-store.d'
import { IUser } from './user.d'

export interface ICommunity extends Pick<ICommunityDto, 'id' | 'name' | 'userCount' | 'isUse'> {
  users?: IUser[]
  bannerUrl: string
}
