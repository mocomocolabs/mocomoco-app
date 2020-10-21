import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { IChatMessage, IChatMessageForm, IChatRoom } from '../models/chat'
import { http } from '../utils/http-util'
import { GetChatMessagesTask, IInsertChatMessage, InsertChatMessageTask } from './chat-store.d'
import { Task } from './task'

const initState = {
  rooms: [],
  currentRoomId: null,
  form: {} as any,
}

export class Chat {
  @observable.shallow rooms: IChatRoom[] = initState.rooms
  @observable currentRoomId: number | null = initState.currentRoomId
  // TODO: struct로 선언했을때 resetForm이 제대로 동작하지 않음.
  @observable form: { [roomId: number]: IChatMessageForm } = initState.form

  @task
  getRooms = (async () => {
    await http.get<IChatRoom[]>('/chats/rooms').then(
      action((data) => {
        this.rooms = data
      })
    )
  }) as Task

  @task
  getRoomMessages = (async ({ roomId, messageId }) => {
    this.setCurrentRoomId(roomId)
    // TODO: messageId를 넘길 경우, 해당 id 이후의 메세지만 response해줌
    await http
      .get<IChatMessage[]>(`/chats/rooms/${roomId}`, { params: { messageId } })
      .then(
        action(async (data) => {
          if (!data) {
            return
          }

          if (!this.room) {
            await this.getRooms()
          }

          if (this.room) {
            this.room.messages = [...(this.room.messages || []), ...data]
          }
        })
      )
  }) as GetChatMessagesTask

  @task.resolved
  insertChatMessage = (async ({ roomId, message }: IInsertChatMessage) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.post(`/chats/rooms/${roomId}`, { roomId, message })
  }) as InsertChatMessageTask

  @action
  setCurrentRoomId(roomId: number | null) {
    this.currentRoomId = roomId
  }

  @action
  setForm(roomId: number, message: string) {
    this.form[roomId] = { roomId, message }
  }

  @computed
  get room(): IChatRoom | undefined {
    return this.rooms.find((v) => v.id === this.currentRoomId)
  }

  @computed
  get lastMessageId(): number | undefined {
    return this.room?.messages?.slice(-1).pop()?.id
  }

  @computed
  get countUnread(): number {
    return this.rooms.reduce((acc, cur) => {
      return acc + cur.unreadCount
    }, 0)
  }
}
