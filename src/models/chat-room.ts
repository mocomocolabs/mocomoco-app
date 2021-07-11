import { IChatRoomDto } from '../stores/chat-store.d'
import { ChatRoomType, IChatRoom } from './chat.d'

export interface ChatRoom extends IChatRoom {}

export class ChatRoom {
  /**
   * @param userId 본인의 userId
   */
  static of(dto: IChatRoomDto, userId: number) {
    console.log(dto.type === ChatRoomType.CLUB ? dto.name : dto.users.find((v) => v.id !== userId)?.nickname)

    return Object.assign(new ChatRoom(), {
      ...dto,
      name: dto.type === ChatRoomType.CLUB ? dto.name : dto.users.find((v) => v.id !== userId)?.nickname,
    })
  }
}
