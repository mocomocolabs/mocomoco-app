import { IUser } from './user'

export interface IStuff {
  id: number
  type: 'GIVE' | 'TAKE'
  status: 'AVAILABLE' | 'RESERVED' | 'FINISH'
  category: IStuffCategory
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
