import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IComment } from './comment'
import { IUser } from './user'

export type FeedType = 'SCHEDULE' | 'NORMAL'

export interface IFeed {
  id: number
  type: FeedType
  user: IUser
  title: string
  content: string
  imageUrls: string[]
  schedule?: IFeedSchedule
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
  title: string
  content: string
  images: ImageUploadItem[]
  schedule?: Partial<IFeedSchedule>
  isPublic: boolean
}

export interface IFeedSchedule {
  id: number
  place: string
  title: string
  startDate: string /** yyyymmdd */
  startTime: string /** hhmmss */
  endDate: string /** yyyymmdd */
  endTime: string /** hhmmss */
  formatScheduleTime: string /** 12월 29일 오후 8:00 - 오후 10:00 */
}

export enum FEED_TYPE {
  NORMAL = 'NORMAL',
}
