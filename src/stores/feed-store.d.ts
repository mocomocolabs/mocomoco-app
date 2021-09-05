import { Task } from 'mobx-task'
import { FeedType, IFeedForm } from '../models/feed.d'
import { IFileDto } from './common/file.d'
import { ICommunityDto } from './community-store.d'
import { IUserDto } from './user-store.d'

export type SaveFeedTask = Task<[Partial<IFeedForm>, boolean], void>

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
  feedComments: { id: number; isUse: boolean }[]
  feedUsers: { isLike: boolean }[]
}

export interface IFeedScheduleDto {
  id: number
  title: string
  place: string
  /** yyyymmddhhmmss */
  startDateTime: string
  /** yyyymmddhhmmss */
  endDateTime: string
  isUse: boolean
}
