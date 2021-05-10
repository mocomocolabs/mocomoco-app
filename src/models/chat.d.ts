import { IUser } from './user'

export interface IChat {
  id: number
  type: ChatType
  user: IUser
  message: string
  createdAt: string // TODO : 논의 필요
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
}

export interface IChatRoomsDto {
  count: number
  chatrooms: IChatRoom[]
}

export enum ChatType {
  NORMAL = 'NORMAL',
  CLUB = 'CLUB',
}

export enum ChatRoomType {
  TALK = 'TALK',
  ENTER = 'ENTER',
  LEAVE = 'LEAVE',
}
