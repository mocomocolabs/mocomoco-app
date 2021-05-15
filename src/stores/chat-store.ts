import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { IChat, IChatForm, IChatRoom, IChatRoomsDto, IPatchReadChatIdDto, ISubChat } from '../models/chat'
import { http } from '../utils/http-util'
import { api } from '../services/api-service'
import {
  GetChatRoomsTask,
  IInsertChatMessage,
  InsertChatMessageTask,
  SetReadChatIdTask,
} from './chat-store.d'
import { webSocket } from '../services/WebSocketService'
import _ from 'lodash'

const initState = {
  rooms: [],
  currentRoomId: null,
  form: {} as { [roomId: number]: IChatForm },
  // unReadCountAll: 0,
}

export class ChatStore {
  @observable.shallow rooms: IChatRoom[] = initState.rooms
  @observable currentRoomId: number | null = initState.currentRoomId
  // TODO: struct로 선언했을때 resetForm이 제대로 동작하지 않음.
  @observable form: { [roomId: number]: IChatForm } = initState.form
  // @observable unReadCountAll: number = initState.unReadCountAll

  @task
  getRooms = (async ({ roomIds }) => {
    await api
      .get<IChatRoomsDto>('http://localhost:8080/api/v1/chatrooms', {
        params: { ids: roomIds.toString() },
      })
      .then(
        action((data) => {
          this.rooms = data.chatrooms.map((v) => ({
            ...v,
            unReadChatCount: v.chats.filter((vv) => vv.id > v.readChatId).length,
          }))
          // this.setUnReadCountAll()
        })
      )
  }) as GetChatRoomsTask

  @task
  setLastChatId = (async ({ roomId, readChatId }) => {
    await api
      .post('http://localhost:8080/api/v1/chatrooms-users/read-chat-id', {
        chatroomId: roomId,
        readChatId,
      })
      .then(
        action(() => {
          this.rooms = this.rooms.map((v) => ({
            ...v,
            readChatId: v.id === roomId ? readChatId : v.readChatId,
            unReadChatCount: 0,
          }))
        })
      )
  }) as SetReadChatIdTask

  @task.resolved
  insertChatMessage = (async ({ roomId, message }: IInsertChatMessage) => {
    const room = _.find(this.rooms, (v) => v.id === roomId)

    await new Promise((r) => setTimeout(() => r(true), 1000))
    await api
      .post<ISubChat>('http://localhost:8080/api/v1/chats', {
        type: 'TALK',
        message,
        chatroomId: roomId,
        isUse: true,
      })
      .then((data) => {
        if (room !== undefined) room.readChatId = data.id
        // this.setUnReadCountAll()
        webSocket.sendMessageForRoom(roomId, JSON.stringify(data))
      })
  }) as InsertChatMessageTask

  @action
  setCurrentRoomId(roomId: number | null) {
    this.currentRoomId = roomId
  }

  @action
  setForm(roomId: number, message: string) {
    this.form[roomId] = { roomId, message }
  }

  @action
  setChat(subChat: ISubChat) {
    const chat = _.omit(subChat, ['chatroom']) as IChat
    const isCurRoom = this.room !== undefined && this.room.id === subChat.chatroom.id

    this.rooms = this.rooms.map((v) => ({
      ...v,
      chats: v.id === subChat.chatroom.id ? [...v.chats, chat] : v.chats,
      unReadChatCount: isCurRoom ? v.unReadChatCount : v.unReadChatCount + 1,
    }))
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
  get unReadCountAll(): number {
    return this.rooms.reduce((acc, cur) => {
      return acc + cur.unReadChatCount
    }, 0)
  }
}
