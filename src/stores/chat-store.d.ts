import { Task } from 'mobx-task'
import { ChatRoomType, IChat } from '../models/chat'
import { IUser } from '../models/user.d'
import { IClubDto } from './club-store.d'
import { IStuffTalentDto } from './stufftalent-store.d'

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
  users: IUser[]
  chats: IChat[]
  readChatId: number
  unReadChatCount: number
  club: IClubDto
  stuff: IStuffTalentDto
  talent: IStuffTalentDto
}

export type InsertChatMessageTask = Task<[IInsertChatMessage], void>

export type GetChatMessagesTask = Task<[IGetChatMessages], void>

export type SetReadChatIdTask = Task<[ISetReadChatId], void>
