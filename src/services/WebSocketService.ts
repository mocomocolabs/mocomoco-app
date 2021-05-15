import { CompatClient } from '@stomp/stompjs/esm6/compatibility/compat-client'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { storage } from './storage-service'
import { IChat } from '../models/chat'

class WebSocketService {
  private wsUrl = 'http://localhost:8080/ws-chat'
  private stompClient: CompatClient | null = null

  init() {
    const sockJS = new SockJS(this.wsUrl)
    this.stompClient = Stomp.over(sockJS)
    this.stompClient.debug = (str) => console.log(str)
  }

  connectRooms(roomIds: number[], cb: (data: any) => void) {
    this.stompClient?.connect({ Authorization: storage.accessTokenForSync }, () =>
      roomIds.forEach((v) => this.subscribeRoom(v, cb))
    )
  }

  subscribeRoom(roomId: number, cb: (data: any) => void) {
    this.stompClient?.subscribe(`/sub/chat/chatrooms/${roomId}`, (data: any) => cb(data))
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
