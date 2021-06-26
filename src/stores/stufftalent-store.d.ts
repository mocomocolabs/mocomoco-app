import { IUser } from '../models/user.d'
import {
  IStuffTalentForm,
  StuffTalentStatus as Status,
  StuffTalentType as Type,
} from './../models/stufftalent.d'
import { IFileDto } from './common/file.d'
import { TaskBy2 } from './task'

export type InsertStuffTalentTask = TaskBy2<Partial<IStuffTalentForm>, boolean>

interface IStuffTalentDtoBase {
  id: number
  type: Type
  status: Status
  category: IStuffTalentCategoryDto
  community: IStuffTalentCommunityDto
  user: IUser
  title: string
  content: string
  price: number
  exchangeText: string
  isLike: boolean
  isExchangeable: boolean
  isNegotiable: boolean
  isPublic: boolean
  createdAt: string
  atchFiles: IFileDto[]
  isUse: boolean
}

export interface IStuffTalentLikeUserDto {
  id: number
  isLike: boolean
  user: IUser[]
  isUse: boolean
}

export interface IStuffTalentDto extends IStuffTalentDtoBase {
  stuffUsers: IStuffTalentLikeUserDto[]
  talentUsers: IStuffTalentLikeUserDto[]
}

export interface IStuffsTalentsDto {
  stuffs: IStuffTalentDto[]
  talents: IStuffTalentDto[]
}

export interface IStuffTalentCategoryDto {
  id: number
  name: string
}

export interface IStuffTalentCommunityDto {
  id: number
  name: string
}
