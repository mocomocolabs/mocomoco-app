import { IAttachFile } from './attachFile'
import { IUser } from './user'

// TODO talent.d.ts와 중복코드 없애기
export interface IStuffs {
  count: number
  stuffs: IStuff[]
}

export interface IStuff {
  id: number
  type: 'GIVE' | 'TAKE'
  status: 'AVAILABLE' | 'RESERVED' | 'FINISH'
  method: 'SELL' | 'FREE' | 'EXCHANGE'
  category: IStuffCategory
  user: IUser
  title: string
  content: string
  price: number // TODO: need a string type
  isPublic: boolean
  createdAt: string
  stuffUsers: IUser[]
  atchFiles: IAttachFile[]
  isUse: boolean
}

export interface IStuffCategories {
  count: number
  categories: IStuffCategory[]
}

export interface IStuffCategory {
  id: num
  name: string
}

export interface IStuffTalentFilter {
  category: number[]
  status: string[]
}
