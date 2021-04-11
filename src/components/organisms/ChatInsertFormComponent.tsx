import { IonIcon, IonTextarea } from '@ionic/react'
import { paperPlane } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { executeWithError } from '../../utils/http-helper-util'
import { scrollToBottom } from '../../utils/scroll-util'
import { Profile } from '../atoms/ProfileComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'

export interface IChatInsertForm {
  roomId: number
  autoFocus?: boolean
}

export const ChatInsertForm: React.FC<IChatInsertForm> = ({ roomId, autoFocus = false }) => {
  const { $chat } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center bg-white'>
      <Profile url='assets/mock/profile1.jpeg'></Profile>
      <IonTextarea
        className='ml-2 bg-m-gray br-lg px-3 black leading-8'
        autoGrow={true}
        rows={1}
        value={$chat.form[roomId]?.message}
        autofocus={autoFocus}
        onIonChange={(e) => {
          $chat.setForm(roomId, e.detail.value!)
        }}
      ></IonTextarea>

      <div className='ml-2'>
        <SpinnerWrapper
          task={$chat.insertChatMessage}
          Submit={() => (
            <IonIcon
              icon={paperPlane}
              className='black'
              onClick={async () => {
                if ($chat.form[roomId]?.message) {
                  executeWithError(async () => {
                    await $chat.insertChatMessage({ roomId, message: $chat.form[roomId]?.message })
                    await $chat.getRoomMessages({ roomId, messageId: $chat.lastMessageId })
                    $chat.setForm(roomId, '')
                    scrollToBottom()
                  })
                }
              }}
            ></IonIcon>
          )}
        ></SpinnerWrapper>
      </div>
    </div>
  ))
}
