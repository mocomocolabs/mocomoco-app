import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { scrollToBottom } from '../../utils/scroll-util'
import { Profile } from '../atoms/ProfileComponent'

interface IChatRoomDetail {
  roomId: number
}

export const ChatRoomDetail: React.FC<IChatRoomDetail> = ({ roomId }) => {
  const { $chat, $user } = useStore()

  useEffect(() => {
    const getRoomMessagesAndScrollBottom = async () => {
      await $chat.getRoomMessages({ roomId })
      scrollToBottom()
    }

    getRoomMessagesAndScrollBottom()
  }, [$chat, roomId])

  return useObserver(() =>
    $chat.getRoomMessages.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <>
          <ul className='pl-0'>
            {$chat.room?.messages?.map((v, i) => (
              <li key={i} className={`flex my-2 ${v.user.id === $user.currentUserId && 'flex-row-reverse'}`}>
                <Profile url={v.user.profileUrl}></Profile>
                <div
                  className={`py-2 px-3 mx-2 br-xlg pre-line ${
                    v.user.id === $user.currentUserId ? 'bg-m-blue' : 'bg-m-gray'
                  }`}
                >
                  {v.message}
                </div>
              </li>
            ))}
          </ul>
        </>
      ),
    })
  )
}
