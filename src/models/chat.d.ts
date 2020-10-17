export interface IChatMessage {
  id: number
  roomId: number
  message: string
  createdAt: string // TODO : 논의 필요
}

export interface IChatMessageForm {
  roomId: number
  message: string
}

export interface IChatRoom {
  id: number
  user: User
  recentMessage: IChatMessage
  unreadCount: number
  messages?: IChatMessage[] // 룸 입장시 셋팅됌
}
