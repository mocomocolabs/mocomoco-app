import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomItem } from '../molecules/ChatRoomItemComponent'

interface IChatRoomList {}

export const ChatRoomList: React.FC<IChatRoomList> = () => {
  const { $chat } = useStore()

  useEffect(() => {
    $chat.getRooms()
    // eslint-disable-next-line
  }, [])

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
              <ChatRoomItem key={i} room={v}></ChatRoomItem>
            ))}
          </ul>
        </>
      ),
    })
  )
}
