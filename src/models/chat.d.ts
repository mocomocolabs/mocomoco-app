import { IChatDto, IChatRoomDto } from '../stores/chat-store.d'
import { IClub } from './club.d'
import { IStuffTalent } from './stufftalent.d'
import { IUser } from './user.d'

export interface IChat extends Pick<IChatDto, 'id' | 'type' | 'message' | 'createdAt'> {
  user: IUser
}

export interface IChatRoom extends Pick<IChatRoomDto, 'id' | 'type' | 'name' | 'readChatId' | 'createdAt'> {
  users: IUser[]
  chats: IChat[]
  club: IClub
  stuff: IStuffTalent
  talent: IStuffTalent
}

export interface ISubscribeChat extends IChat {
  chatroom: IChatRoom
  // 새로 생성한 채팅의 상대방에게 publish하기 위한 값
  targetUserId?: number
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
  ALL = '',
  NORMAL = 'NORMAL',
  CLUB = 'CLUB',
  STUFF = 'STUFF',
  TALENT = 'TALENT',
}

export enum ChatType {
  TALK = 'TALK',
  ENTER = 'ENTER',
  LEAVE = 'LEAVE',
}
