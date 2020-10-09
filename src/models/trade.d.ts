import { IUser } from './user'

export interface ITradeCategory {
  id: num
  name: string
}

export interface ITrade {
  id: number
  type: 'GIVE' | 'TAKE'
  status: 'AVAILABLE' | 'RESERVED' | 'FINISH'
  category: ITradeCategory
  user: IUser
  title: string
  content: string
  price: number // TODO: need a string type
  imageUrls: string[]
  likeCount: number
  likeProflieUrls: string[]
  chatCount: number
  publicOpen: boolean
  createdAt: string // TODO: 임시
}
