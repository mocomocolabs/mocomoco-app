import { Capacitor } from '@capacitor/core'
import { IonTextarea } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { maxLengthValidator } from '../../utils/form-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'
import './ChatInsertFormComponent.scss'

export interface IChatInsertForm {
  roomId: number
  autoFocus?: boolean
}

export const ChatInsertForm: React.FC<IChatInsertForm> = ({ roomId, autoFocus = false }) => {
  const { $chat, $auth, $ui } = useStore()

  const [isValid, setValid] = useState<boolean>(false)

  const sendMessage = useCallback(async () => {
    if (isValid && $chat.form[roomId]?.message) {
      await $chat.insertChatMessage({ roomId, message: $chat.form[roomId]?.message })
    }
  }, [isValid])

  return useObserver(() => (
    <div className='flex flex-1 pv-2'>
      <div className='flex flex-none'>
        <ProfileImage
          url={$auth.user.profileUrl || $chat.room?.users.find(({ id }) => id === $auth.user.id)?.profileUrl}
        />
      </div>

      <div className='chat-insert-form flex-between-center w-full ml-3 px-3 br-20 border-primary'>
        <IonTextarea
          className='leading-none'
          placeholder='내용을 입력해주세요'
          autoGrow={true}
          rows={1}
          value={$chat.form[roomId]?.message}
          onFocus={() => {
            // FIXME: IOS 포커스시 스크롤이 되지 않는 이슈가 있어 강제로 스크롤을 이동한다
            if (Capacitor.getPlatform() === 'ios') {
              setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight)
              }, 290)
            }
          }}
          autofocus={autoFocus}
          onIonChange={(e) => {
            const value = e.detail.value!
            const validate = maxLengthValidator(value, 200)

            setValid(validate === true)
            validate === true ? $chat.setForm(roomId, value) : $ui.showToastError({ message: validate })
          }}
        />

        <SpinnerWrapper
          task={$chat.insertChatMessage}
          Submit={
            <Icon
              name='send-solid'
              className={isValid && $chat.form[roomId]?.message ? 'icon-secondary' : 'icon-gray'}
              onClick={sendMessage}
            ></Icon>
          }
        />
      </div>
    </div>
  ))
}
