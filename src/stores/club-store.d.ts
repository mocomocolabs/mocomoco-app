import { Task } from 'mobx-task'
import { IClubForm } from '../models/club.d'
import { IFileDto } from './common/file'
import { ICommunityDto } from './community-store.d'
import { IUserDto } from './user-store.d'

export type InsertClubTask = Task<[Partial<IClubForm>, boolean], IClubDto>

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
  clubUsers: IClubMemberDto[]
  chatroom: {
    id: number
  }
  adminUsers: IUserDto[]
  community: ICommunityDto
  atchFiles: IFileDto[]
  isPublic: boolean
  isLike: boolean
  clubHashtags: IClubHashtagDto[]
  createdAt: string
}

export interface IClubMemberDto {
  user: IUserDto
  isLike: boolean
  isUse: boolean
}
export interface IClubHashtagDto {
  id: number
  hashtag: IHashtagDto
  isUse: boolean
}

export interface IHashtagDto {
  id: number
  name: string
  isUse: boolean
}
