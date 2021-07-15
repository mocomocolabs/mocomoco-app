import { IChatRoomDto } from '../stores/chat-store.d'
import { IUser } from './user'

export interface IChat {
  id: number
  type: ChatType
  user: IUser
  message: string
  createdAt: string
}

export interface IChatRoom extends IChatRoomDto {}

export interface ISubscribeChat extends IChat {
  chatroom: IChatRoomDto
}

export interface IChatForm {
  roomId: number
  message: string
}

export interface IStoreChatRoom {
  id: number
  readChatId: number
  // TODO: unreadCount인 것이 더 직관적인 이름일듯
  readCount: number
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
