import React, { FC } from 'react'
import { IChatRoom } from '../../models/chat'
import { route } from '../../services/route-service'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextSm } from '../atoms/TextSmComponent'

interface IChatRoomListItem {
  room: IChatRoom
}

export const ChatRoomListItem: FC<IChatRoomListItem> = ({ room }) => {
  return (
    <li className='py-4 flex'>
      <div className='mr-2' onClick={() => route.profileDetail(room.user.id)}>
        <Profile url={room.user.profileUrl}></Profile>
      </div>
      <div className='flex-between-center flex-1' onClick={() => route.chatRoom(room.id)}>
        <div className='flex-col'>
          <div className='flex'>
            <TextLg className='mr-2'>{room.user.nickname}</TextLg>
            <TextBase className='mr-2 dark-gray'>{room.user.community}</TextBase>
            <TextBase className='dark-gray'>{room.recentMessage.createdAt}</TextBase>
          </div>
          <TextBase className='ellipsis max-width-270'>{room.recentMessage.message}</TextBase>
        </div>
        {room.unreadCount > 0 && (
          <div className='flex-center br-full bg-m-red w-6 min-w-6 h-6 ml-2'>
            <TextSm>{room.unreadCount}</TextSm>
          </div>
        )}
      </div>
    </li>
  )
}
