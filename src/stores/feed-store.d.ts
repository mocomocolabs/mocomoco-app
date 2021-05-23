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
  scheduleDate: string
  type: FeedType
  community: ICommunityDto
  atchFiles: IFileDto[]
  user: IUserDto
  isPublic: boolean
  createdAt: string
  // TODO
  feedComments: any[]
}
