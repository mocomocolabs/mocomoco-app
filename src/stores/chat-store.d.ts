import { Task } from 'mobx-task'

export interface IInsertChatMessage {
  roomId: number
  message: string
}

export type InsertChatMessageTask = Task<[IInsertChatMessage], void>
