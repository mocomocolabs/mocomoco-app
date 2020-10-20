import { IUser } from './user'

export interface IChatMessage {
  id: number
  roomId: number
  user: IUser
  message: string
  createdAt: string // TODO : 논의 필요
}

export interface IChatMessageForm {
  roomId: number
  message: string
}

export interface IChatRoom {
  id: number
  user: IUser
  recentMessage: IChatMessage
  unreadCount: number
  messages?: IChatMessage[] // 룸 입장시 셋팅됌
}
