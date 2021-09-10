import { StuffTalentStatus as Status, StuffTalentType as Type } from './../models/stufftalent.d'
import { IChatRoomDto } from './chat-store.d'
import { IFileDto } from './common/file.d'
import { ICommunityDto } from './community-store.d'
import { IUserDto } from './user-store.d'

interface IStuffTalentDtoBase {
  id: number
  type: Type
  status: Status
  category: IStuffTalentCategoryDto
  community: ICommunityDto
  user: IUserDto
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
  user: IUserDto
  isUse: boolean
  chatroom: IChatRoomDto
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

export interface ICreateChatDto {
  stuffId?: number
  talentId?: number
}
