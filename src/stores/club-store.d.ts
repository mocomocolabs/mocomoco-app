import { Task } from 'mobx-task'
import { IClubForm } from '../models/club.d'
import { IFileDto } from './common/file'
import { ICommunityDto } from './community-store.d'
import { IUserDto } from './user-store.d'

export type InsertClubTask = Task<[Partial<IClubForm>], void>

export interface IClubDto {
  // adminUsers: [{id: 1, email: "junho@junho.com", name: "준호", nickname: "준호", mobile: "123456789", fcmToken: "_",…}]
  clubUsers: { user: IUserDto }[]
  id: number
  community: ICommunityDto
  name: string
  description: string
  meetingPlace: string
  meetingTime: string
  atchFiles: IFileDto[]
  isPublic: boolean
  clubHashtags: { hashtag: { name: string } }[]
  createdAt: string
}
