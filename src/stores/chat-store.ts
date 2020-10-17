import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { IChatMessage, IChatMessageForm, IChatRoom } from '../models/chat'
import { http } from '../utils/http-util'
import { IInsertChatMessage, InsertChatMessageTask } from './chat-store.d'
import { Task, TaskByNumber } from './task'

const initState = {
  form: {} as any,
  rooms: [],
}

export class Chat {
  @observable.shallow rooms: IChatRoom[] = initState.rooms
  @observable.struct form: { [roomId: number]: IChatMessageForm } = initState.form

  @task
  getRooms = (async () => {
    await http.get<IChatRoom[]>('/chats/rooms').then(
      action((data) => {
        this.rooms = data
      })
    )
  }) as Task

  @task
  getRoomMessages = (async (roomId: number) => {
    await http.get<IChatMessage[]>(`/chats/rooms/${roomId}`).then(
      action(async (data) => {
        if (!data) {
          return
        }

        if (!this.roomBy(roomId)) {
          await this.getRooms()
        }

        const room = this.roomBy(roomId)
        if (room) {
          room.messages = data
        }
      })
    )
  }) as TaskByNumber

  @task.resolved
  insertChatMessage = (async ({ roomId, message }: IInsertChatMessage) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.post(`/chats/rooms/${roomId}`, { roomId, message })
  }) as InsertChatMessageTask

  @action
  setForm(roomId: number, message: string) {
    this.form[roomId] = { roomId, message }
  }

  @action
  resetForm(roomId: number) {
    delete this.form[roomId]
  }

  @computed
  roomBy(roomId: number): IChatRoom | undefined {
    return this.rooms.find((v) => v.id === roomId)
  }
}
