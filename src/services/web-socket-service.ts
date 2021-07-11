import { Stomp } from '@stomp/stompjs'
import { CompatClient } from '@stomp/stompjs/esm6/compatibility/compat-client'
import SockJS from 'sockjs-client'
import { config } from '../config'
import { storage } from './storage-service'

class WebSocketService {
  private wsUrl = config.SOCKET_URL
  private stompClient: CompatClient | null = null

  init() {
    this.stompClient = Stomp.over(() => new SockJS(this.wsUrl))
    this.stompClient.debug = (str) => console.log(str)
  }

  /**
   * 채팅방을 구독합니다
   * @param subscribeRooms 기존 채팅방을 구독
   * @param subscribeNewChat 새로운 채팅방을 구독
   */
  connectRooms(
    subscribeRooms: {
      roomIds: number[]
      cb: (data: any) => void
    },
    subscribeNewChat: {
      userId: number
      cb: (data: any) => void
    }
  ) {
    this.stompClient?.connect({ Authorization: storage.accessTokenForSync }, () => {
      subscribeRooms.roomIds.forEach((v) => this.subscribeRoom(v, subscribeRooms.cb))
      this.subscribeFirstChat(subscribeNewChat.userId, subscribeNewChat.cb)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribeRoom(roomId: number, cb: (data: any) => void) {
    this.stompClient?.subscribe(`/sub/chat/chatrooms/${roomId}`, (data: any) => cb(data))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribeFirstChat(userId: number, cb: (data: any) => void) {
    this.stompClient?.subscribe(`/sub/chat/users/${userId}`, (data: any) => cb(data))
  }

  sendMessageForRoom(roomId: number, message: string) {
    this.stompClient?.send(
      `/pub/chat/chatrooms/${roomId}`,
      { Authorization: storage.accessTokenForSync },
      message
    )
  }

  disConnect() {
    this.stompClient?.disconnect()
  }
}

export const webSocket = new WebSocketService()
