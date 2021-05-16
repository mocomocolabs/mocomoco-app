import { IUser } from './user'
import { IClubDto } from '../stores/club-store.d'

export interface IChat {
  id: number
  type: ChatType
  user: IUser
  message: string
  createdAt: string // TODO : 논의 필요
}

export interface ISubChat extends IChat {
  chatroom: IChatRoom
}

export interface IChatForm {
  roomId: number
  message: string
}

export interface IChatRoom {
  id: number
  type: ChatRoomType
  name: string
  users: IUser[]
  chats: IChat[]
  readChatId: number
  unReadChatCount: number
  club: IClubDto
}

export interface IStoreChatRoom {
  id: number
  readChatId: number
  readCount: number
}

export interface IChatRoomsDto {
  count: number
  chatrooms: IChatRoom[]
}

export enum ChatRoomType {
  NORMAL = 'NORMAL',
  CLUB = 'CLUB',
}

export enum ChatType {
  TALK = 'TALK',
  ENTER = 'ENTER',
  LEAVE = 'LEAVE',
}
