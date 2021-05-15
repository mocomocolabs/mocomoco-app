import { FC } from 'react'
import { IChatRoom } from '../../models/chat'
import { route } from '../../services/route-service'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { useStore } from '../../hooks/use-store'
import _ from 'lodash'

interface IChatRoomListItem {
  room: IChatRoom
}

export const ChatRoomListItem: FC<IChatRoomListItem> = ({ room }) => {
  const { $auth } = useStore()
  const isClub = room.type.toString() === 'CLUB'
  const contactUser = room.users.filter((v) => v.id !== $auth.user.id)[0]
  const imageUrl = isClub ? room.club.atchFiles[0].url : contactUser.profileUrl
  const lastChat = _.maxBy(room.chats, (v) => v.createdAt)

  const nickname = isClub ? room.club.name : contactUser.nickname
  const communityName = isClub
    ? room.club.community.name
    : contactUser.communities.map((community) => community.name).join('/')

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
        {room.unReadChatCount > 0 && (
          <div className='flex-center br-full bg-m-red w-6 min-w-6 h-6 ml-2'>
            <TextSm>{room.unReadChatCount}</TextSm>
          </div>
        )}
      </div>
    </li>
  )
}
