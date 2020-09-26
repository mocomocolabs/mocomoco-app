import { IComment } from './comment'
import { IUser } from './user'

export interface IFeed {
  id: number
  type: 'SCHEDULE' | 'NORMAL'
  scheduleDate: string // TODO: 임시
  scheduleTitle: string
  user: IUser
  title: string
  content: string
  imageUrls: string[]
  commentCount: number
  likeCount: number
  likeProflieUrls: string[]
  comments: IComment[]
  createdAt: string // TODO: 임시
}
