import { IAttachFile } from './attachFile'
import { IUser } from './user'

// TODO stuff.d.ts와 중복코드 없애기
export interface ITalents {
  count: number
  talents: ITalent[]
}

export interface ITalent {
  id: number
  type: 'GIVE' | 'TAKE'
  status: 'AVAILABLE' | 'RESERVED' | 'FINISH'
  method: 'SELL' | 'FREE' | 'EXCHANGE'
  category: ITalentCategory
  user: IUser
  title: string
  content: string
  price: number // TODO: need a string type
  isPublic: boolean
  createdAt: string
  talentUsers: IUser[]
  atchFiles: IAttachFile[]
}

export interface ITalentCategories {
  count: number
  categories: ITalentCategory[]
}
export interface ITalentCategory {
  id: num
  name: string
}
