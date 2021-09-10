import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IStuffTalentDto, IStuffTalentLikeUserDto } from '../stores/stufftalent-store.d'
import { IChatRoom } from './chat.d'
import { ICommunity } from './community.d'
import { IUser } from './user.d'

export enum StuffTalentPageKey {
  STUFF = 'STUFF',
  TALENT = 'TALENT',
}

export enum StuffTalentType {
  SELL = 'SELL',
  SHARE = 'SHARE',
  EXCHANGE = 'EXCHANGE',
  WANT = 'WANT',
}

export enum StuffTalentStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  FINISH = 'FINISH',
}

export interface IStuffTalent
  extends Pick<
    IStuffTalentDto,
    | 'id'
    | 'type'
    | 'status'
    | 'category'
    | 'title'
    | 'content'
    | 'price'
    | 'exchangeText'
    | 'isLike'
    | 'isExchangeable'
    | 'isNegotiable'
    | 'isPublic'
    | 'atchFiles'
    | 'createdAt'
  > {
  user: IUser
  community: ICommunity
  stuffUsers: IStuffTalentLikeUser[]
  talentUsers: IStuffTalentLikeUser[]
  likeCount: number
  chatroomId: number
  imageUrls: string[]
}
export interface IStuffTalentLikeUser extends Pick<IStuffTalentLikeUserDto, 'id' | 'isLike'> {
  user: IUser
  chatroom: IChatRoom
}

export interface IStuffTalentFilter {
  isPublic: boolean | undefined
  communityId: number | null
  userId: number | undefined
  categories: number[]
  notStatuses: StuffTalentStatus[]
  types: StuffTalentType[]
  isLike?: boolean
  limit: number
}

export interface IStuffTalentForm {
  id?: number
  communityId: number
  status: StuffTalentStatus
  type: StuffTalentType
  categoryId: number
  title: string
  content: string
  price?: number
  exchangeText?: string
  isExchangeable: boolean
  isNegotiable: boolean
  isPublic: boolean
  images: ImageUploadItem[]
}
