import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IComment } from './comment'
import { IUser } from './user'

export type FeedType = 'SCHEDULE' | 'NORMAL'

export interface IFeed {
  id: number
  type: FeedType
  scheduleDate: string
  scheduleTime: string
  scheduleTitle: string
  user: IUser
  title: string
  content: string
  imageUrls: string[]
  commentCount: number
  likeCount: number
  likeProflieUrls: string[]
  comments: IComment[]
  createdAt: string
  isPublic: boolean
  isLike: boolean
  writtenComment: boolean
}

export interface IFeedForm {
  id?: number
  communityId: number
  type: FeedType
  scheduleDate: string
  scheduleTime: string
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
