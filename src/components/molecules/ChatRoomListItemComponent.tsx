import _ from 'lodash'
import { FC, useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomType, IChatRoom } from '../../models/chat.d'
import { route } from '../../services/route-service'
import { Profile } from '../atoms/ProfileComponent'
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
  const contactUser = room.users.filter((v) => v.id !== $auth.user.id)[0]
  const imageUrl = isClub ? room.club.atchFiles[0].url : contactUser.profileUrl
  const lastChat = _.maxBy(room.chats, (v) => v.createdAt)

  const nickname = isClub ? room.club.name : contactUser.nickname
  const communityName = isClub
    ? room.club.community.name
    : contactUser.communities.map((community) => community.name).join('/')
  const readCount = $chat.storeRooms.find((v) => v.id === room.id)?.readCount

  return (
    <li className='py-4 flex'>
      <div
        className='mr-2'
        onClick={() => {
          if (isClub) {
            console.log('클럽 홈으로 가야됨')
          } else {
            route.profileDetail(contactUser.id)
          }
        }}
      >
        <Profile url={imageUrl}></Profile>
      </div>
      <div className='flex-between-center flex-1' onClick={() => route.chatRoom(room.id)}>
        <div className='flex-col'>
          <div className='flex'>
            <TextLg className='mr-2'>{nickname}</TextLg>
            <TextBase className='mr-2 d-gray'>{communityName}</TextBase>
            <TextBase className='d-gray'>{lastChat?.createdAt}</TextBase>
          </div>
          <TextBase className='ellipsis max-width-270'>{lastChat?.message}</TextBase>
        </div>
        {_.isNumber(readCount) && readCount > 0 && (
          <div className='flex-center br-full bg-red w-6 min-w-6 h-6 ml-2'>
            <TextSm>{readCount}</TextSm>
          </div>
        )}
      </div>
    </li>
  )
}
