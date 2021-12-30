import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { ChatRoomType, ChatType, IChatRoom } from '../models/chat'
import { IClubDto } from './club-store.d'
import { IFileDto } from './common/file'
import { IStuffTalentDto } from './stufftalent-store.d'
import { TaskBy } from './task'
import { IUserDto } from './user-store.d'

export interface IInsertChat {
  roomId: number
  message: string
  images: ImageUploadItem[]
}

export interface IInsertChatMessage {
  roomId: number
  message: string
}

export interface IInsertChatImages {
  roomId: number
  imagesId: number
  images: ImageUploadItem[]
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
  createdAt: string
}

export interface IChatDto {
  id: number
  type: ChatType
  user: IUserDto
  message: string
  atchFiles: IFileDto[]
  createdAt: string
}

export interface IChatReqDto {
  type: ChatType
  message: string
  chatroomId: number
  isUse: true
}

export interface ISubscribeChat extends IChatDto {
  chatroom: IChatRoom
  // 새로 생성한 채팅의 상대방에게 publish하기 위한 값
  targetUserId?: number
}

export type InsertChatMessageTask = TaskBy<IInsertChatMessage>

export type InsertChatImagesTask = TaskBy<IInsertChatImages>

export type InsertChatTask = TaskBy<IInsertChat>

export type GetChatMessagesTask = TaskBy<IGetChatMessages>

export type SetReadChatIdTask = TaskBy<ISetReadChatId>
