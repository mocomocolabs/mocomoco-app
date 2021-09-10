import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IFeedDto, IFeedScheduleDto } from '../stores/feed-store.d'
import { IComment } from './comment.d'
import { IUser } from './user.d'

export enum FeedType {
  NORMAL = 'NORMAL',
}

export enum ScheduleType {
  FEED = 'FEED',
}

export interface IFeed
  extends Pick<IFeedDto, 'id' | 'type' | 'title' | 'content' | 'isLike' | 'isPublic' | 'createdAt'> {
  user: IUser
  schedule?: IFeedSchedule
  imageUrls: string[]
  comments: IComment[]
  likeCount: number
  writtenComment: boolean
}

export interface IFeedSchedule extends Pick<IFeedScheduleDto, 'id' | 'type' | 'title' | 'place' | 'isUse'> {
  startDate: string /** yyyymmdd */
  startTime: string /** hhmmss */
  endDate: string /** yyyymmdd */
  endTime: string /** hhmmss */
  formatScheduleTime: string /** 12월 29일 오후 8:00 - 오후 10:00 */
  feedId: number
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
