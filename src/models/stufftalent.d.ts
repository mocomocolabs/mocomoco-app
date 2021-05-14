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
  statuses: StuffTalentStatus[]
  types: StuffTalentType[]
}
