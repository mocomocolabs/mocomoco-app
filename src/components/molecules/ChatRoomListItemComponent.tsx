import _ from 'lodash'
import { FC, useMemo } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomType, IChatRoom } from '../../models/chat.d'
import { IUser } from '../../models/user.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'

interface IRoomInfoGetter {
  type: ChatRoomType
  info: (
    room: IChatRoom,
    loginUserId?: number
  ) => {
    imageUrl: string
    roomName: string
    communityName: string
    route: () => void
  }
}

const roomInfoGetter: IRoomInfoGetter[] = [
  {
    type: ChatRoomType.NORMAL,
    info: (room: IChatRoom, loginUserId?: number) => {
      // TODO 지금 내가 가진 모든 채팅방에서, 나만 말을 했거나, 아무 대화가 없으면 contactUser===undefined가 된다.
      // UI적인 예외처리가 필요함.
      const contactUser: IUser = room.users.find((v) => v.id !== loginUserId) ?? ({} as IUser)
      return {
        imageUrl: contactUser.profileUrl,
        roomName: contactUser.nickname,
        communityName: contactUser.communities?.map((community) => community.name).join('/'),
        route: () => !!contactUser.id && route.profileDetail(contactUser.id),
      }
    },
  },
  {
    type: ChatRoomType.CLUB,
    info: (room: IChatRoom) => ({
      imageUrl: room.club.imageUrls[0],
      roomName: room.name,
      communityName: room.club.community.name,
      route: () => !!room.club.id && route.clubDetail(room.club.id),
    }),
  },
  {
    type: ChatRoomType.STUFF,
    info: (room: IChatRoom, loginUserId?: number) => {
      const contactUser: IUser = room.users.find((v) => v.id !== loginUserId) ?? ({} as IUser)

      return {
        imageUrl: room.stuff.atchFiles[0].url,
        roomName: contactUser.nickname,
        communityName: room.stuff.community.name,
        route: () => !!room.stuff.id && route.stuffDetail(room.stuff.id),
      }
    },
  },
  {
    type: ChatRoomType.TALENT,
    info: (room: IChatRoom, loginUserId?: number) => {
      const contactUser: IUser = room.users.find((v) => v.id !== loginUserId) ?? ({} as IUser)

      return {
        imageUrl: room.talent.atchFiles[0].url,
        roomName: contactUser.nickname,
        communityName: room.talent.community.name,
        route: () => !!room.talent.id && route.talentDetail(room.talent.id),
      }
    },
  },
]

interface IChatRoomListItem {
  room: IChatRoom
}

export const ChatRoomListItem: FC<IChatRoomListItem> = ({ room }) => {
  const { $auth, $chat } = useStore()

  const roomInfo = useMemo(
    () => roomInfoGetter.find((i) => i.type === room.type)?.info(room, $auth.user.id),
    [room]
  )

  const lastChat = _.maxBy(room.chats, (v) => v.createdAt)
  const readCount = $chat.storeRooms.find((v) => v.id === room.id)?.readCount

  return (
    <li className='flex-between-center py-3'>
      <div className='flex-center flex-none mr-4' onClick={() => roomInfo?.route()}>
        <ProfileImage className='width-52 height-52' url={roomInfo?.imageUrl}></ProfileImage>
      </div>
      <div className='flex-col justify-center flex-1 ellipsis' onClick={() => route.chatRoom(room.id)}>
        <div className='flex-between-center'>
          <div className='flex items-baseline ellipsis'>
            <TextBase className='mr-1 text-bold'>{roomInfo?.roomName}</TextBase>
            <TextSm className='mr-1 gray ellipsis'>{roomInfo?.communityName}</TextSm>
          </div>
          <TextSm className='flex-none gray'>{timeDiff(lastChat?.createdAt)}</TextSm>
        </div>
        <div className='flex-between-center flex-none'>
          <TextSm className='ellipsis'>{lastChat?.message}</TextSm>
          {_.isNumber(readCount) && readCount > 0 && (
            <div className='flex-center flex-none br-full bg-red min-width-20 min-height-20 leading-none ml-2 white'>
              <TextSm>{readCount}</TextSm>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
