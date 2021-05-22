import { Task } from 'mobx-task'

export interface IInsertChatMessage {
  roomId: number
  message: string
}

export interface IGetChatMessages {
  roomId: number
  messageId?: number | undefined
}

export interface IGetRooms {
  roomIds: []
}

export type InsertChatMessageTask = Task<[IInsertChatMessage], void>

export type GetChatMessagesTask = Task<[IGetChatMessages], void>

export type GetChatRoomsTask = Task<[IGetRooms], void>
