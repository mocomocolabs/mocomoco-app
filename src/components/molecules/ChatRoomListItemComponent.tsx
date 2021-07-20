import _ from 'lodash'
import { FC, useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomType, IChatRoom } from '../../models/chat.d'
import { IUser } from '../../models/user'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'

interface IChatRoomListItem {
  room: IChatRoom
}

export const ChatRoomListItem: FC<IChatRoomListItem> = ({ room }) => {
  const { $auth, $chat } = useStore()

  useEffect(() => {}, [$chat.unReadCountAll])

  const isClub = room.type === ChatRoomType.CLUB
  // TODO 지금 내가 가진 모든 채팅방에서, 나만 말을 했거나, 아무 대화가 없으면 contactUser===undefined가 된다.
  // UI적인 예외처리가 필요함.
  const contactUser: IUser = room.users.filter((v) => v.id !== $auth.user.id)[0] ?? {}
  const imageUrl = isClub ? room.club.atchFiles[0].url : contactUser.profileUrl
  const lastChat = _.maxBy(room.chats, (v) => v.createdAt)

  const nickname = isClub ? room.club.name : contactUser.nickname
  const communityName = isClub
    ? room.club.community.name
    : contactUser.communities?.map((community) => community.name).join('/')
  const readCount = $chat.storeRooms.find((v) => v.id === room.id)?.readCount

  return (
    <li className='flex-between-center py-3'>
      <div
        className='flex-center flex-none mr-4'
        onClick={() => {
          if (isClub) {
            console.log('클럽 홈으로 가야됨')
          } else {
            route.profileDetail(contactUser.id)
          }
        }}
      >
        <ProfileImage className='width-52 height-52' url={imageUrl}></ProfileImage>
      </div>
      <div className='flex-col justify-center flex-1 ellipsis' onClick={() => route.chatRoom(room.id)}>
        <div className='flex-between-center'>
          <div className='flex items-baseline ellipsis'>
            <TextBase className='mr-1 text-bold'>{nickname}</TextBase>
            <TextSm className='mr-1 gray ellipsis'>{communityName}</TextSm>
          </div>
          <TextSm className='flex-none gray'>{timeDiff(lastChat?.createdAt)}</TextSm>
        </div>
        <div className='flex-between-center flex-none'>
          <TextSm className='ellipsis'>{lastChat?.message}</TextSm>
          {_.isNumber(readCount) && readCount >= 0 && (
            <div className='flex-center flex-none br-full bg-red min-width-20 min-height-20 leading-none ml-2 white'>
              <TextSm>{readCount}</TextSm>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
