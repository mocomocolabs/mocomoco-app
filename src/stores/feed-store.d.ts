import { FeedType, IFeed, IFeedForm, ScheduleType } from '../models/feed.d'
import { ICommentDto } from './comment-store.d'
import { IFileDto } from './common/file.d'
import { ICommunityDto } from './community-store.d'
import { TaskBy2As } from './task'
import { IUserDto } from './user-store.d'

export type SaveFeedTask = TaskBy2As<Partial<IFeedForm>, boolean, IFeed>

export interface IFeedDto {
  id: number
  name: string
  nickname: string
  title: string
  content: string
  schedule: IFeedScheduleDto
  type: FeedType
  community: ICommunityDto
  atchFiles: IFileDto[]
  user: IUserDto
  isPublic: boolean
  isLike: boolean
  createdAt: string
  feedComments: ICommentDto[]
  feedUsers: { isLike: boolean }[]
}

export interface IFeedScheduleDto {
  id: number
  type: ScheduleType
  title: string
  place: string
  /** yyyymmddhhmmss */
  startDateTime: string
  /** yyyymmddhhmmss */
  endDateTime: string
  feed: IFeedDto
  isUse: boolean
}
