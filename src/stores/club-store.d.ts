import { Task } from 'mobx-task'
import { IClubForm } from '../models/club.d'
import { IFileDto } from './common/file'
import { ICommunityDto } from './community-store.d'
import { IUserDto } from './user-store.d'

export type InsertClubTask = Task<[Partial<IClubForm>], IClubDto>

export type JoinClubTask = Task<[IJoinClubDto], void>

export interface IJoinClubDto {
  clubId: number
  userId: number
}

export interface IClubDto {
  id: number
  name: string
  description: string
  meetingTime: string
  meetingPlace: string
  clubUsers: { user: IUserDto; isLike: boolean; isUse: boolean }[]
  chatroom: {
    id: number
  }
  adminUsers: IUserDto[]
  community: ICommunityDto
  atchFiles: IFileDto[]
  isPublic: boolean
  isLike: boolean
  clubHashtags: { hashtag: { name: string } }[]
  createdAt: string
}
