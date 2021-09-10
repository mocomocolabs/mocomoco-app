import _ from 'lodash'
import { IChatDto, IChatRoomDto } from '../stores/chat-store.d'
import { ChatRoomType, IChat, IChatRoom } from './chat.d'
import { Club } from './club'
import { StuffTalent } from './stufftalent'
import { IStuffTalent, StuffTalentPageKey } from './stufftalent.d'
import { User } from './user'

export interface ChatRoom extends IChatRoom {}

export class ChatRoom {
  /**
   * @param loginUserId 본인의 userId
   */
  static of(dto: IChatRoomDto, loginUserId: number): IChatRoom {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          name:
            dto.type === ChatRoomType.NORMAL
              ? dto.users.find((v) => v.id !== loginUserId)?.nickname ?? ''
              : dto.name,
          users: dto.users.map((u) => User.of(u)),
          chats: dto.chats.map((c) => ChatRoom.chatOf(c)),
          club: Club.of(dto.club, loginUserId),
          stuff:
            !!dto.stuff && !_.isEmpty(dto.stuff)
              ? StuffTalent.of(dto.stuff, StuffTalentPageKey.STUFF, loginUserId)
              : ({} as IStuffTalent),
          talent: !!dto.talent
            ? StuffTalent.of(dto.talent, StuffTalentPageKey.TALENT, loginUserId)
            : ({} as IStuffTalent),
        }
      : ({} as IChatRoom)
  }

  static chatOf(dto: IChatDto): IChat {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          user: User.of(dto.user),
        }
      : ({} as IChat)
  }
}
