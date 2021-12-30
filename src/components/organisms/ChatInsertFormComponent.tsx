import { Capacitor } from '@capacitor/core'
import { IonTextarea } from '@ionic/react'
import _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { maxLengthValidator } from '../../utils/form-util'
import { executeWithError } from '../../utils/http-helper-util'
import { urlToFile } from '../../utils/image-util'
import { infinityScrollToBottom } from '../../utils/scroll-util'
import { Icon } from '../atoms/IconComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'
import { assignPreview, ImageUploadItem } from '../molecules/ImageUploaderComponent'
import './ChatInsertFormComponent.scss'

export interface IChatInsertForm {
  roomId: number
  autoFocus?: boolean
}

export const ChatInsertForm: React.FC<IChatInsertForm> = ({ roomId, autoFocus = false }) => {
  const { $chat, $ui } = useStore()

  const [isValid, setValid] = useState<boolean>(false)

  const sendMessage = useCallback(async () => {
    if (isValid && $chat.messageForm[roomId]?.message?.length > 0) {
      await $chat.insertChatMessage({ roomId, message: $chat.messageForm[roomId]?.message })
    }
  }, [isValid])

  const emptyImages = new Array(10) as ImageUploadItem[]

  const sendImages = async () => {
    const max = _.random(1, 10)
    const imagesId = Number(_.uniqueId())
    console.log('======================== sendImages - imagesId=', imagesId)

    $chat.setImagesForm(roomId, imagesId, emptyImages.slice(0, max)) //TODO 개수만큼 빈 파일 객체라도 넘겨야 함.

    ///////////
    //TODO 이 블럭을 앞단으로 옮겨야 할 듯
    const images = []
    for (let i = 0; i < max; i++) {
      images.push(
        assignPreview(await urlToFile('http://localhost:3000/assets/img/스프린트11.png'), imagesId * 100 + i)
      )
    }

    $chat.setImagesForm(roomId, imagesId, images)
    ///////////

    await new Promise((r) => setTimeout(() => r(0), 2000)) //TODO 삭제

    try {
      await $chat.insertChatImages({ roomId, imagesId, images })
    } finally {
      $chat.setImagesForm(roomId, imagesId, []) //TODO 빈 배열이 계속 남아있게 된다. 별로다
      //TODO revoke image urls
      images.forEach((image) => URL.revokeObjectURL(image.preview))
    }
  }

  return useObserver(() => (
    <div className='flex flex-1 pv-2'>
      <div className='flex-center flex-none'>
        <Icon name='image' className='icon-secondary' onClick={() => executeWithError(() => sendImages())} />
        {/* <Icon name='image' className='icon-secondary' onClick={() => uploader.current?.click()} /> */}
      </div>

      <div className='chat-insert-form flex-between-center w-full ml-3 px-3 br-20 border-primary'>
        <IonTextarea
          className='leading-none'
          placeholder='내용을 입력해주세요'
          autoGrow={true}
          rows={1}
          value={$chat.messageForm[roomId]?.message}
          onFocus={() => {
            // IOS Infinite Scroll 포커스시 스크롤 되지 않는 이슈가 있어 강제로 스크롤을 이동한다
            if (Capacitor.getPlatform() === 'ios') {
              infinityScrollToBottom()
            }
          }}
          autofocus={autoFocus}
          onIonChange={(e) => {
            const value = e.detail.value!
            const validate = maxLengthValidator(value, 200)

            setValid(validate === true)
            validate === true
              ? $chat.setMessageForm(roomId, value)
              : $ui.showToastError({ message: validate })
          }}
        />

        <SpinnerWrapper
          task={$chat.insertChatMessage}
          Submit={
            <Icon
              name='send-solid'
              className={isValid && $chat.messageForm[roomId]?.message ? 'icon-secondary' : 'icon-gray'}
              onClick={sendMessage}
            ></Icon>
          }
        />
      </div>
    </div>
  ))
}
