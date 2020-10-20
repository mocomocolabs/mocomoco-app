import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomListItem } from '../molecules/ChatRoomListItemComponent'

interface IChatRoomList {}

export const ChatRoomList: React.FC<IChatRoomList> = () => {
  const { $chat } = useStore()

  useEffect(() => {
    $chat.getRooms()
  }, [$chat])

  return useObserver(() =>
    $chat.getRooms.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <>
          <ul className='pl-0'>
            {$chat.rooms.map((v, i) => (
              <ChatRoomListItem key={i} room={v}></ChatRoomListItem>
            ))}
          </ul>
        </>
      ),
    })
  )
}
