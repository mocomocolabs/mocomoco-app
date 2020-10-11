import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IComment } from './comment'
import { IUser } from './user'

type FeedType = 'SCHEDULE' | 'NORMAL'

export interface IFeed {
  id: number
  type: FeedType
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
  isPublic: boolean
}

export interface IFeedForm {
  id?: number
  type: FeedType
  scheduleDate: string // TODO: 임시
  scheduleTime: string // TODO: 임시
  scheduleTitle: string
  title: string
  content: string
  images: ImageUploadItem[]
  isPublic: boolean
}

export enum FEED_TYPE {
  NORMAL = 'NORMAL',
  SCHEDULE = 'SCHEDULE',
}
