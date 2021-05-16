import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { IChat, IChatForm, IChatRoom, IChatRoomsDto, ISubChat, IStoreChatRoom } from '../models/chat'
import { api } from '../services/api-service'
import {
  GetChatRoomsTask,
  IInsertChatMessage,
  InsertChatMessageTask,
  SetReadChatIdTask,
} from './chat-store.d'
import { webSocket } from '../services/WebSocketService'
import _ from 'lodash'
import { storage } from '../services/storage-service'

const initState = {
  rooms: [],
  currentRoomId: null,
  form: {} as { [roomId: number]: IChatForm },
  storeRooms: [],
}

export class ChatStore {
  @observable.shallow rooms: IChatRoom[] = initState.rooms
  @observable currentRoomId: number | null = initState.currentRoomId
  // TODO: struct로 선언했을때 resetForm이 제대로 동작하지 않음.
  @observable form: { [roomId: number]: IChatForm } = initState.form
  @observable storeRooms: IStoreChatRoom[] = initState.storeRooms

  @task
  getRooms = (async ({ roomIds }) => {
    await api
      .get<IChatRoomsDto>('http://localhost:8080/api/v1/chatrooms', {
        params: { ids: roomIds.toString() },
      })
      .then(
        action(async (data) => {
          this.rooms = data.chatrooms

          const orgStoreChatRooms = await storage.getStoreChatRoom()
          if (_.isEmpty(orgStoreChatRooms)) {
            this.setStoreRooms(
              this.rooms.map((v) => ({
                id: v.id,
                readChatId: 0,
                readCount: 0,
              }))
            )
          } else {
            const orgStoreChatRoomsArr = JSON.parse(orgStoreChatRooms) as IStoreChatRoom[]
            this.setStoreRooms(
              this.rooms.map((v) => {
                const find = orgStoreChatRoomsArr.find((vv) => vv.id === v.id)
                return _.isEmpty(find) || find === undefined
                  ? {
                      id: v.id,
                      readChatId: 0,
                      readCount: 0,
                    }
                  : find
              })
            )
          }
        })
      )
  }) as GetChatRoomsTask

  @action
  setLastChatId = (async ({ roomId, readChatId }) => {
    if (this.currentRoomId === undefined || this.currentRoomId === null) {
      this.setStoreRooms(
        this.storeRooms.map((v) => {
          if (v.id === roomId) return { ...v, readCount: v.readCount + 1 }
          else return v
        })
      )
    } else {
      this.setStoreRooms(
        this.storeRooms.map((v) => {
          if (v.id === roomId) return { ...v, readChatId, readCount: 0 }
          else return v
        })
      )
    }

    await storage.setStoreChatRoom(JSON.stringify(this.storeRooms))
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

    this.rooms = this.rooms.map((v) => ({
      ...v,
      chats: v.id === subChat.chatroom.id ? [...v.chats, chat] : v.chats,
    }))
  }

  @action
  setStoreRooms(storeRooms: IStoreChatRoom[]) {
    this.storeRooms = storeRooms
  }

  @computed
  get room(): IChatRoom | undefined {
    return this.rooms.find((v) => v.id === this.currentRoomId)
  }

  @computed
  get storeRoom(): IStoreChatRoom | undefined {
    return this.storeRooms.find((v) => v.id === this.currentRoomId)
  }

  @computed
  get lastMessageId(): number | undefined {
    return this.room?.chats?.slice(-1).pop()?.id
  }

  @computed
  get unReadCountAll(): number {
    return this.storeRooms.reduce((acc, cur) => acc + cur.readCount, 0)
  }
}
