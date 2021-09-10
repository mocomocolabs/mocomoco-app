import { IonTextarea } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { useFocus } from '../../hooks/use-focus'
import { useStore } from '../../hooks/use-store'
import { scrollToBottom } from '../../utils/scroll-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'
import './ChatInsertFormComponent.scss'

export interface IChatInsertForm {
  roomId: number
  autoFocus?: boolean
}

export const ChatInsertForm: React.FC<IChatInsertForm> = ({ roomId, autoFocus = false }) => {
  const { $chat, $auth } = useStore()
  const [inputRef, setFocus] = useFocus()

  const sendMessage = useCallback(async () => {
    if ($chat.form[roomId]?.message) {
      await $chat.insertChatMessage({ roomId, message: $chat.form[roomId]?.message })
      scrollToBottom()
      setFocus()
    }
  }, [])

  return useObserver(() => (
    <div className='flex flex-1 pv-2'>
      <div className='flex flex-none'>
        <ProfileImage
          url={$auth.user.profileUrl ?? $chat.room?.users.find(({ id }) => id === $auth.user.id)?.profileUrl}
        />
      </div>

      <div className='chat-insert-form flex-between-center w-full ml-3 px-3 br-20 border-primary'>
        <IonTextarea
          className='leading-none'
          ref={inputRef}
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
    </div>
  ))
}
