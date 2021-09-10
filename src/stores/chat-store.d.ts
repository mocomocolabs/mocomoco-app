import { Task } from 'mobx-task'
import { ChatRoomType, ChatType } from '../models/chat'
import { IClubDto } from './club-store.d'
import { IStuffTalentDto } from './stufftalent-store.d'
import { IUserDto } from './user-store.d'

export interface IInsertChatMessage {
  roomId: number
  message: string
}

export interface IGetChatMessages {
  roomId: number
  messageId?: number | undefined
}

export interface ISetReadChatId {
  roomId: number
  readChatId: number
}

export interface IChatRoomDto {
  id: number
  type: ChatRoomType
  name: string
  users: IUserDto[]
  chats: IChatDto[]
  readChatId: number
  unReadChatCount: number
  club: IClubDto
  stuff: IStuffTalentDto
  talent: IStuffTalentDto
}

export interface IChatDto {
  id: number
  type: ChatType
  user: IUserDto
  message: string
  createdAt: string
}

export type InsertChatMessageTask = Task<[IInsertChatMessage], void>

export type GetChatMessagesTask = Task<[IGetChatMessages], void>

export type SetReadChatIdTask = Task<[ISetReadChatId], void>
