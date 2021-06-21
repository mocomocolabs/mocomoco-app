import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IStuffTalentDto } from '../stores/stufftalent-store.d'

export enum StuffTalentPathName {
  STUFF = 'STUFF',
  TALENT = 'TALENT',
}

export enum StuffTalentType {
  GIVE = 'GIVE',
  TAKE = 'TAKE',
}

export enum StuffTalentStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  FINISH = 'FINISH',
}

export enum StuffTalentMethod {
  SELL = 'SELL',
  FREE = 'FREE',
  EXCHANGE = 'EXCHANGE',
}

export interface IStuffTalent extends IStuffTalentDto {}

export interface IStuffTalentFilter {
  isPublic: boolean
  communityId: number | undefined
  userId: number | undefined
  categories: number[]
  notStatuses: StuffTalentStatus[]
  types: StuffTalentType[]
}

export interface IStuffTalentForm {
  id?: number
  communityId: number
  status: StuffTalentStatus
  type: StuffTalentType
  categoryId: number
  title: string
  content: string
  method: StuffTalentMethod
  price?: number
  exchangeText?: string
  isExchangeable: boolean
  isNegotiable: boolean
  isPublic: boolean
  images: ImageUploadItem[]
}
