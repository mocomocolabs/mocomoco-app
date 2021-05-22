import { Stomp } from '@stomp/stompjs'
import { CompatClient } from '@stomp/stompjs/esm6/compatibility/compat-client'
import SockJS from 'sockjs-client'
import { config } from '../config'
import { storage } from './storage-service'

class WebSocketService {
  private wsUrl = config.SOCKET_URL
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
