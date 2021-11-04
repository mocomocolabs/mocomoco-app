import { Client, IFrame, IMessage, StompConfig } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { config } from '../config'
import { storage } from './storage-service'

class WebSocketService {
  readonly stompConfig: StompConfig = {
    webSocketFactory: () => new SockJS(config.SOCKET_URL),
    reconnectDelay: 500,
    // maxWebSocketChunkSize: 1024 * 1024, // TODO output buffer size
    // logRawCommunication: true, // TODO only for debug
    debug: (str: string) => console.log(str),
    onStompError: (frame: IFrame) => {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('💣 Broker reported error: ', frame.headers['message'])
      console.log('💣 Additional details: ', frame.body)
    },
    onUnhandledFrame: (frame: IFrame) => {
      console.log('💣 onUnhandledFrame: ', frame.headers['message'], frame)
    },
    onUnhandledMessage: (message: IMessage) => {
      console.log('💣 onUnhandledMessage: ', message)
    },
    onUnhandledReceipt: (receipt: IFrame) => {
      console.log('💣 onUnhandledReceipt: ', receipt)
    },
    onWebSocketError: (event: Event) => {
      console.log('💣 onWebSocketError: ', event)
    },
    onWebSocketClose: (closeEvent: CloseEvent) => {
      console.log('💔 onWebSocketClose: ', closeEvent.reason, closeEvent)
    },
  }

  private stompClient: Client = new Client(this.stompConfig)

  private savedRoomIds: number[] = []

  /**
   * 채팅방을 구독합니다
   * @param subscribeRooms 기존 채팅방을 구독
   * @param subscribeNewChat 새로운 채팅방을 구독
   */
  connectRooms(
    subscribeRooms: {
      roomIds: number[]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cb: (data: any) => void
    },
    subscribeNewChat: {
      userId: number
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cb: (data: any) => void
    }
  ) {
    this.stompClient.connectHeaders = { Authorization: storage.accessTokenForSync }

    this.stompClient.onConnect = (frame: IFrame) => {
      console.log('🤝 onConnect', frame)
      console.log('🤝 onConnect - subscribeRooms: ', subscribeRooms.roomIds.toString())
      console.log('🤝 onConnect - savedRoomIds: ', this.savedRoomIds.toString())

      subscribeRooms.roomIds.forEach((v) => this.subscribeRoom(v, subscribeRooms.cb))
      this.subscribeFirstChat(subscribeNewChat.userId, subscribeNewChat.cb)
    }

    this.stompClient.onDisconnect = (frame: IFrame) => {
      console.log('💔 onDisconnect', frame)
      this.savedRoomIds = []
    }

    this.stompClient.activate()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribeRoom(roomId: number, cb: (data: any) => void) {
    if (!this.savedRoomIds.some((v) => v === roomId)) {
      console.log('📡 subscribe roomId ', roomId)

      this.savedRoomIds.push(roomId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.stompClient.subscribe(`/sub/chat/chatrooms/${roomId}`, (data: any) => cb(data))
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribeFirstChat(userId: number, cb: (data: any) => void) {
    console.log('🗿 subscribe userId ', userId)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.stompClient.subscribe(`/sub/chat/users/${userId}`, (data: any) => cb(data))
  }

  sendMessageForRoom(roomId: number, message: string) {
    this.stompClient.publish({
      destination: `/pub/chat/chatrooms/${roomId}`,
      headers: { Authorization: storage.accessTokenForSync },
      body: message,
    })
  }

  sendMessageForNewRoom(userId: number, message: string) {
    this.stompClient.publish({
      destination: `/pub/chat/users/${userId}`,
      headers: { Authorization: storage.accessTokenForSync },
      body: message,
    })
  }

  disconnect() {
    this.stompClient.deactivate()
  }
}

export const webSocket = new WebSocketService()
