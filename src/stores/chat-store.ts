import _ from 'lodash'
import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ChatRoom } from '../models/chat-room'
import {
  ChatRoomType,
  ChatType,
  IChat,
  IChatForm,
  IChatRoom,
  IStoreChatRoom,
  ISubscribeChat,
} from '../models/chat.d'
import { api } from '../services/api-service'
import { storage } from '../services/storage-service'
import { webSocket } from '../services/web-socket-service'
import { AuthStore } from './auth-store'
import {
  IChatRoomDto,
  IInsertChatMessage,
  InsertChatMessageTask,
  ISetReadChatId,
  SetReadChatIdTask,
} from './chat-store.d'
import { TaskBy } from './task'

const initState = {
  rooms: [],
  currentRoomId: null,
  form: {} as { [roomId: number]: IChatForm },
  storeRooms: [],
}

export class ChatStore {
  @observable.shallow rooms: ChatRoom[] = initState.rooms
  @observable currentRoomId: number | null = initState.currentRoomId
  // TODO: struct로 선언했을때 resetForm이 제대로 동작하지 않음.
  @observable form: { [roomId: number]: IChatForm } = initState.form
  /**
   * 방마다의 읽음 정보를 저장
   * TODO: 읽음 정보를 저장한다고 알 수 있는 직관적인 네이밍이 좋을듯
   */
  @observable storeRooms: IStoreChatRoom[] = initState.storeRooms

  $auth: AuthStore

  constructor(rootStore: RootStore) {
    this.$auth = rootStore.$auth
  }

  connectRooms = async () => {
    await this.getRooms(this.$auth.user.chatroomIds)

    // 웹소켓 연결
    webSocket.init()
    webSocket.connectRooms(
      // 기존 채팅방
      {
        roomIds: this.rooms.map((v) => v.id),
        cb: (data) => {
          const subChat = JSON.parse(data.body) as ISubscribeChat
          this.setChat(subChat)
          this.setLastChatId({
            roomId: subChat.chatroom.id,
            readChatId: subChat.id,
          })
        },
      },
      // 새로운 채팅방
      {
        userId: this.$auth.user.id,
        cb: (data) => {
          // 첫 채팅을 받는 경우
          const subChat = JSON.parse(data.body) as ISubscribeChat
          // 새로 만들어진 채팅방을 구독상태로 한다.
          webSocket.subscribeRoom(subChat.chatroom.id, (data) => {
            const subChat = JSON.parse(data.body) as ISubscribeChat
            this.setChat(subChat)
            this.setLastChatId({
              roomId: subChat.chatroom.id,
              readChatId: subChat.id,
            })
          })
          // 기존 채팅방에 새로운 채팅룸 공간을 생성.
          // 첫 채팅 데이터를 스토어에 저장한다.
          this.setChat(subChat)
          this.setLastChatId({
            roomId: subChat.chatroom.id,
            readChatId: subChat.id,
          })
        },
      }
    )
  }

  @task
  getRooms = (async (roomIds) => {
    if (roomIds.length === 0) {
      return
    }

    await api
      .get<{ chatrooms: IChatRoomDto[] }>('/v1/chatrooms?limit=999', {
        params: { ids: roomIds.toString() },
      })
      .then(
        action(async (data) => {
          this.rooms = data.chatrooms.map((v) => ChatRoom.of(v, this.$auth.user.id))

          // TODO: 앱 재설치시, 모든 채팅이 unread 상태인데 추후 대안 필요
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
            this.setStoreRooms(
              this.rooms.map((v) => {
                const find = orgStoreChatRooms.find((vv) => vv.id === v.id)
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
  }) as TaskBy<number[]>

  /**
   * 해당 유저와 1:1 채팅을 생성합니다.
   * @param targetUserId 상대방의 userId
   */
  @action
  createChat = async (targetUserId: number) => {
    const createdRoom = this.rooms.find(
      (v) => v.type === ChatRoomType.NORMAL && v.users.some((user) => user.id === targetUserId)
    )
    if (createdRoom) {
      return createdRoom.id
    }

    await api.post('/v1/chatrooms', {
      type: ChatRoomType.NORMAL,
      name: '-',
      relationUserIds: [targetUserId, this.$auth.user.id].join(','),
    })

    const roomId = await this.getRoomIdBy(targetUserId)

    if (!roomId) {
      throw new Error('채팅 생성에 문제가 발생했습니다. 관리자에게 문의해주실래요?')
    }
    return roomId
  }

  /**
   * 새로 생성된 roomId를 리턴합니다
   * TODO : 추후 서버와 협의후 chat insert후 바로 roomId를 리턴하도록 수정
   * @param targetUserId 1:1 채팅의 상대방 userId
   */
  async getRoomIdBy(targetUserId: number) {
    await this.$auth.signInWithToken()
    await this.getRooms(this.$auth.user.chatroomIds)
    const newRoom = this.rooms.find(
      (v) => v.type === ChatRoomType.NORMAL && v.users.some((u) => u.id === targetUserId)
    )

    return newRoom?.id
  }

  @action
  setLastChatId = (async ({ roomId, readChatId }: ISetReadChatId) => {
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

    storage.setStoreChatRoom(this.storeRooms)
  }) as SetReadChatIdTask

  @task.resolved
  insertChatMessage = (async ({ roomId, message }: IInsertChatMessage) => {
    const room = _.find(this.rooms, (v) => v.id === roomId)

    await api
      .post<ISubscribeChat>('/v1/chats', {
        type: ChatType.TALK,
        message,
        chatroomId: roomId,
        isUse: true,
      })
      .then((data) => {
        if (room !== undefined) room.readChatId = data.id
        webSocket.sendMessageForRoom(roomId, JSON.stringify(data))
        this.setForm(roomId, '')
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
  setChat(subChat: ISubscribeChat) {
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
