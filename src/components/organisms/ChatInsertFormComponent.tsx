import { IonTextarea } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'

export interface IChatInsertForm {
  roomId: number
  autoFocus?: boolean
}

export const ChatInsertForm: React.FC<IChatInsertForm> = ({ roomId, autoFocus = false }) => {
  const { $chat, $user } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center'>
      <ProfileImage url={$user.user.profileUrl}></ProfileImage>
      <IonTextarea
        className='ml-2 br-20 pl-4 px-3 black leading-8 border-primary'
        placeholder='내용을 입력해주세요'
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
          Submit={
            <Icon
              name='send-solid'
              className={$chat.form[roomId]?.message ? 'icon-secondary' : 'icon-gray'}
              onClick={async () => {
                if ($chat.form[roomId]?.message) {
                  await $chat.insertChatMessage({ roomId, message: $chat.form[roomId]?.message })
                }
              }}
            ></Icon>
          }
        ></SpinnerWrapper>
      </div>
    </div>
  ))
}
