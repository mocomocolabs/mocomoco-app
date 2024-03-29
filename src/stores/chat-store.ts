import { Capacitor } from '@capacitor/core'
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
import { infinityScrollToBottom } from '../utils/scroll-util'
import { AuthStore } from './auth-store'
import {
  IChatDto,
  IChatRoomDto,
  IInsertChatMessage,
  InsertChatMessageTask,
  ISetReadChatId,
  SetReadChatIdTask,
} from './chat-store.d'
import { TaskBy, TaskBy2 } from './task'

const initState = {
  rooms: [],
  currentRoomId: null,
  form: {} as { [roomId: number]: IChatForm },
  storeRooms: [],
}

export class ChatStore {
  @observable rooms: ChatRoom[] = initState.rooms
  @observable selectedRoomType: ChatRoomType = ChatRoomType.ALL
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
    webSocket.connectRooms(
      // 기존 채팅방
      {
        roomIds: this.rooms.map((v) => v.id),
        cb: (data) => {
          const subChat = JSON.parse(data.body) as ISubscribeChat
          this.setChatAndMeta(subChat)
        },
      },
      // 새로운 채팅방
      {
        userId: this.$auth.user.id,
        cb: async (data) => {
          // 첫 채팅을 받는 경우
          const subChat = JSON.parse(data.body) as ISubscribeChat

          if (this.rooms.some((r) => r.id === subChat.chatroom.id)) {
            console.log('새 채팅방 정보가 이미 처리된 상태임. 남은 작업 안함')
            return
          }

          // 새로 만들어진 채팅방을 구독상태로 한다.
          await this.subscribeNewRoom(subChat.chatroom.id)
        },
      }
    )
  }

  disconnect = async () => {
    webSocket.disconnect()
  }

  @task
  getRooms = (async (roomIds) => {
    if (!roomIds || roomIds.length === 0) {
      return
    }

    await api
      .get<{ chatrooms: IChatRoomDto[] }>(`/v1/chatrooms?is-use=true&limit=999`, {
        params: { ids: roomIds.toString() },
      })
      .then(
        action(async (data) => {
          this.rooms = data.chatrooms.map((v) => ChatRoom.of(v, this.$auth.user.id))

          const orgStoreChatRooms = await storage.getStoreChatRoom()
          if (_.isEmpty(orgStoreChatRooms)) {
            this.setStoreRooms(
              this.rooms.map((v) => ({
                id: v.id,
                readChatId: v.readChatId,
                readCount: v.chats?.filter((c) => c.id > v.readChatId).length,
              }))
            )
          } else {
            this.setStoreRooms(
              this.rooms.map((v) => {
                const find = orgStoreChatRooms.find((vv) => vv.id === v.id)
                const readChatId = _.max([find?.readChatId, v.readChatId]) ?? 0
                const readCount = v.chats?.filter((c) => c.id > readChatId).length

                return {
                  id: v.id,
                  readChatId,
                  readCount,
                }
              })
            )
          }
        })
      )
  }) as TaskBy<number[]>

  @action
  setRoomType = (type: ChatRoomType) => {
    this.selectedRoomType = type
  }

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
      throw new Error('채팅 생성에 문제가 발생했습니다. 하마지기에게 문의해주실래요?')
    }

    this.subscribeNewRoom(roomId)

    return roomId
  }

  @task.resolved
  insertChatMessage = (async ({ roomId, message }: IInsertChatMessage) => {
    const room = _.find(this.rooms, (v) => v.id === roomId)

    if (room === undefined) {
      throw new Error('채팅방 정보를 찾을 수 없습니다.')
    }

    await api
      .post<ISubscribeChat>('/v1/chats', {
        type: ChatType.TALK,
        message,
        chatroomId: roomId,
        isUse: true,
      })
      .then((data) => {
        // 첫 채팅시
        if (room.chats.length === 0) {
          console.log('sendMessageForNewRoom')

          const targetUsers = room.users.filter((v) => v.id !== this.$auth.user.id)
          if (_.isEmpty(targetUsers)) {
            throw new Error('채팅방 참여자 정보를 찾을 수 없습니다.')
          }

          targetUsers.forEach(({ id: targetUserId }) => {
            data.targetUserId = targetUserId
            webSocket.sendMessageForNewRoom(targetUserId, JSON.stringify(data))
          })
        } else {
          console.log('sendMessageForRoom')

          webSocket.sendMessageForRoom(roomId, JSON.stringify(data))
        }
        this.setForm(roomId, '')
      })
  }) as InsertChatMessageTask

  /**
   *
   * @param lastId 현재 화면의 마지막 chat id
   */
  @task.resolved
  getChatMessages = (async (chatRoomId: number, lastId: number) => {
    const { chats: chatsDto } = await api.get<{ chats: IChatDto[] }>('/v1/chats', {
      params: {
        'chatroom-id': chatRoomId,
        'last-id': lastId,
        'is-use': true,
        'limit': 20,
      },
    })

    const chats = chatsDto.map((chatDto) => ChatRoom.chatOf(chatDto))

    this.setChats(chatRoomId, chats)
  }) as TaskBy2<number, number>

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
    if (this.currentRoomId !== roomId) {
      this.setStoreRooms(
        this.storeRooms.map((v) => (v.id === roomId ? { ...v, readCount: v.readCount + 1 } : v))
      )
    } else {
      await api.post(`/v1/chatrooms-users/read-chat-id`, { chatroomId: roomId, readChatId })

      this.setStoreRooms(
        this.storeRooms.map((v) => (v.id === roomId ? { ...v, readChatId, readCount: 0 } : v))
      )
    }

    storage.setStoreChatRoom(this.storeRooms)
  }) as SetReadChatIdTask

  @action
  setChatAndMeta = (chat: ISubscribeChat) => {
    // 기존 채팅방에 새로운 채팅룸 공간을 생성.
    // 첫 채팅 데이터를 스토어에 저장한다.
    this.setChat(chat)
    this.setLastChatId({
      roomId: chat.chatroom.id,
      readChatId: chat.id,
    })

    this.scrollToBottom(chat.chatroom.id)
  }

  subscribeRoom = (roomId: number) => {
    webSocket.subscribeRoom(roomId, (data) => {
      const subChat = JSON.parse(data.body) as ISubscribeChat
      this.setChatAndMeta(subChat)
    })
  }

  subscribeNewRoom = async (roomId: number) => {
    this.subscribeRoom(roomId)
    const currentRoomIds = this.rooms.map((v) => v.id)
    if (!currentRoomIds.includes(roomId)) {
      await this.getRooms([roomId, ...currentRoomIds])
    }
  }

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
      chats: v.id === subChat.chatroom.id ? [chat, ...v.chats] : v.chats,
    }))
  }

  @action
  setChats(roomId: number, chats: IChat[]) {
    this.rooms = this.rooms.map((v) => ({
      ...v,
      chats: v.id === roomId ? [...v.chats, ...chats] : v.chats,
    }))
  }

  @action
  setStoreRooms(storeRooms: IStoreChatRoom[]) {
    this.storeRooms = storeRooms
  }

  /**
   * IOS Infinite Scroll이 자동으로 최하단으로 이동하지 않아서, 강제로 이동시켜줍니다.
   * TODO: store에서 UI를 조작하는 로직을 실행하는게 적합하지 않음.
   * @param currentRoomId 현재 RoomId
   */
  scrollToBottom(currentRoomId: number) {
    if (currentRoomId === this.currentRoomId) {
      if (Capacitor.getPlatform() === 'ios') {
        infinityScrollToBottom()
      }
    }
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
