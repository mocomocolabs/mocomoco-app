import { IAttachFile } from './attachFile'
import { IUser } from './user'

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
}

export interface IStuffCategory {
  id: num
  name: string
}
