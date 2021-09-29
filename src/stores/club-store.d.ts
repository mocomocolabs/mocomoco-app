import { IClubForm } from '../models/club.d'
import { IFileDto } from './common/file'
import { ICommunityDto } from './community-store.d'
import { TaskBy, TaskBy2As } from './task'
import { IUserDto } from './user-store.d'

export type InsertClubTask = TaskBy2As<Partial<IClubForm>, boolean, IClubDto>

export type JoinClubTask = TaskBy<IJoinClubDto>

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
  role: CLUB_ROLE
  isLike: boolean
  isUse: boolean
}

export enum CLUB_ROLE {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  NONE = 'ROLE_NONE', //TODO 추후 서버적용사항과 맞추기
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
