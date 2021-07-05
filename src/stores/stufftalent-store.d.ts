import { IUser } from '../models/user.d'
import { StuffTalentStatus as Status, StuffTalentType as Type } from './../models/stufftalent.d'
import { IFileDto } from './common/file.d'

interface IStuffTalentDtoBase {
  id: number
  type: Type
  status: Status
  category: IStuffTalentCategoryDto
  community: IStuffTalentCommunityDto
  chatroom: IStuffTalentChatroomDto
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

interface IStuffTalentInsertReqDto {
  id: number
  type: Type
  status: Status
  categoryId: number
  communityId: number
  title: string
  content: string
  price: number
  exchangeText: string
  isExchangeable: boolean
  isNegotiable: boolean
  isPublic: boolean
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

export interface IStuffTalentChatroomDto {
  id: number
}

export interface ICreateChatDto {
  stuffId?: number
  talentId?: number
  userId: number
}
