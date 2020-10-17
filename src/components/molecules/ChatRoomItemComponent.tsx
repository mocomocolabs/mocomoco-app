import React, { FC } from 'react'
import { IChatRoom } from '../../models/chat'
import { route } from '../../route'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextSm } from '../atoms/TextSmComponent'

interface IChatRoomItem {
  room: IChatRoom
}

export const ChatRoomItem: FC<IChatRoomItem> = ({ room }) => {
  return (
    <li className='py-4 flex'>
      <div className='mr-2' onClick={() => route.profileDetail(room.user.id)}>
        <Profile url={room.user.profileUrl}></Profile>
      </div>
      <div className='flex-between-center flex-1' onClick={() => route.chatRoom(room.id)}>
        <div className='flex-col'>
          <div className='flex-between-center'>
            <TextLg className='mr-2'>{room.user.nickname}</TextLg>
            <TextBase className='mr-2 dark-gray'>{room.user.community}</TextBase>
            <TextBase className='dark-gray'>{room.recentMessage.createdAt}</TextBase>
          </div>
          <TextBase className='ellipsis'>{room.recentMessage.message}</TextBase>
        </div>
        <div className='flex-center br-full bg-m-red w-6 h-6'>
          <TextSm>{room.unreadCount}</TextSm>
        </div>
      </div>
    </li>
  )
}
