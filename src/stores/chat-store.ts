import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { IChat, IChatForm, IChatRoom, IChatRoomsDto } from '../models/chat'
import { http } from '../utils/http-util'
import { api } from '../services/api-service'
import {
  GetChatMessagesTask,
  GetChatRoomsTask,
  IInsertChatMessage,
  InsertChatMessageTask,
} from './chat-store.d'

const initState = {
  rooms: [],
  currentRoomId: null,
  isWsReady: false,
  wsClient: null,
  // topic: 'chat',
  form: {} as { [roomId: number]: IChatForm },
}

export class ChatStore {
  @observable.shallow rooms: IChatRoom[] = initState.rooms
  @observable currentRoomId: number | null = initState.currentRoomId
  @observable isWsReady: boolean = initState.isWsReady
  @observable wsClient: any = initState.wsClient
  // @observable topic: string = initState.topic
  // TODO: struct로 선언했을때 resetForm이 제대로 동작하지 않음.
  @observable form: { [roomId: number]: IChatForm } = initState.form

  @task
  getRooms = (async ({ roomIds }) => {
    await api
      .get<IChatRoomsDto>('http://localhost:8080/api/v1/chatrooms', {
        params: { ids: roomIds.toString() },
      })
      .then(
        action((data) => {
          this.rooms = data.chatrooms
        })
      )
  }) as GetChatRoomsTask

  @task
  getRoomMessages = (async ({ roomId, messageId }) => {
    this.setCurrentRoomId(roomId)
    // TODO: messageId를 넘길 경우, 해당 id 이후의 메세지만 response해줌
    await http
      .get<IChat[]>(`http://localhost:8080/api/v1/chatrooms/${roomId}`, {
        params: { lastId: messageId },
      })
      .then(
        action(async (data) => {
          if (!data) {
            return
          }

          if (!this.room) {
            // await this.getRooms()
          }

          if (this.room) {
            this.room.chats = [...(this.room.chats || []), ...data]
          }
        })
      )
  }) as GetChatMessagesTask

  @task.resolved
  insertChatMessage = (async ({ roomId, message }: IInsertChatMessage) => {
    await new Promise((r) => setTimeout(() => r(true), 1000))
    await http.post(`/chats/rooms/${roomId}`, { roomId, message })
  }) as InsertChatMessageTask

  @action
  setCurrentRoomId(roomId: number | null) {
    this.currentRoomId = roomId
  }

  @action
  setWsClient(wsClient: any) {
    this.wsClient = wsClient
  }

  @action
  setIsWsReady(isWsReady: boolean) {
    this.isWsReady = isWsReady
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
    return this.room?.chats?.slice(-1).pop()?.id
  }

  @computed
  get unreadCountAll(): number {
    return this.rooms.reduce((acc, cur) => {
      return acc + cur.chats.filter((v) => v.id > cur.readChatId).length
    }, 0)
  }
}
