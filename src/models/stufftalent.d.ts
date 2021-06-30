import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IStuffTalentDto } from '../stores/stufftalent-store.d'

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

export interface IStuffTalent extends IStuffTalentDto {
  likeCount: number
  imageUrls: string[]
  chatroomId: number
}

export interface IStuffTalentFilter {
  isPublic: boolean
  communityId: number | undefined
  userId: number | undefined
  categories: number[]
  notStatuses: StuffTalentStatus[]
  types: StuffTalentType[]
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
