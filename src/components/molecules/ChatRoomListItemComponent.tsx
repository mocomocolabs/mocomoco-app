import _ from 'lodash'
import { FC, useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomType, IChatRoom } from '../../models/chat.d'
import { IUser } from '../../models/user'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
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
    <li className='py-4 flex'>
      <div
        className='mr-2 mr-4'
        onClick={() => {
          if (isClub) {
            console.log('클럽 홈으로 가야됨')
          } else {
            route.profileDetail(contactUser.id)
          }
        }}
      >
        <ProfileImage className='width-64 height-64' url={imageUrl}></ProfileImage>
      </div>
      <div className='flex-col justify-center flex-1' onClick={() => route.chatRoom(room.id)}>
        <div className='flex flex-between-center'>
          <div className='flex'>
            <TextLg className='mr-2 text-bold'>{nickname}</TextLg>
            <TextBase className='mr-2 gray'>{communityName}</TextBase>
          </div>
          <TextBase className='gray'>{timeDiff(lastChat?.createdAt)}</TextBase>
        </div>
        <div className='flex-between-center'>
          <TextBase className='ellipsis max-width-270'>{lastChat?.message}</TextBase>
          {_.isNumber(readCount) && readCount > 0 && (
            <div className='flex-center br-full bg-red w-6 h-6 ml-2 white'>
              <TextSm>{readCount}</TextSm>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
