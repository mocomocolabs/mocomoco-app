import { IonTextarea } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { useStore } from '../../hooks/use-store'
import { scrollToBottom } from '../../utils/scroll-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'

export interface IChatInsertForm {
  roomId: number
  autoFocus?: boolean
}

export const ChatInsertForm: React.FC<IChatInsertForm> = ({ roomId, autoFocus = false }) => {
  const { $chat, $user } = useStore()

  const sendMessage = useCallback(async () => {
    if ($chat.form[roomId]?.message) {
      await $chat.insertChatMessage({ roomId, message: $chat.form[roomId]?.message })
      scrollToBottom()
    }
  }, [])

  return useObserver(() => (
    <>
      <ProfileImage url={$user.user.profileUrl}></ProfileImage>

      <div className='flex-between-center w-full ml-3 px-3 br-20 my-1 border-primary'>
        <IonTextarea
          placeholder='내용을 입력해주세요'
          autoGrow={true}
          rows={1}
          value={$chat.form[roomId]?.message}
          autofocus={autoFocus}
          onIonChange={(e) => {
            $chat.setForm(roomId, e.detail.value!)
          }}
        />

        <SpinnerWrapper
          task={$chat.insertChatMessage}
          Submit={
            <Icon
              name='send-solid'
              className={$chat.form[roomId]?.message ? 'icon-secondary' : 'icon-gray'}
              onClick={sendMessage}
            ></Icon>
          }
        />
      </div>
    </>
  ))
}
