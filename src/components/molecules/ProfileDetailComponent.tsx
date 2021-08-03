import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { Icon } from '../atoms/IconComponent'
import { ImageBackground } from '../atoms/ImageBackgroundComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { TextXl } from '../atoms/TextXlComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { TaskObserver } from './TaskObserverComponent'

interface IProfileDetailItem {
  userId: number
}

export const ProfileDetail: React.FC<IProfileDetailItem> = ({ userId }) => {
  const { $user, $chat, $auth } = useStore()

  useEffect(() => {
    $user.getUser(userId)
  }, [$user, userId])

  //TODO performance 확인 - render 횟수 등
  return (
    <TaskObserver taskTypes={$user.getUser} spinnerPosition='center'>
      {() => (
        <div className='flex-col item-center w-full h-full relative'>
          <ImageBackground
            className='w-full h-full absolute dark-15'
            url={$user.user.profileUrl || '/assets/img/hama.png'}
          />

          <div className='px-container w-full absolute z-10 bottom-0 white'>
            <TextXl className='mb-2 text-center text-bold'>{$user.user.nickname}</TextXl>

            <div className='flex-center items-center gap-1 mb-4'>
              <Icon name='location' size={16} color='white' />
              <TextSm className='items-center text-center'>
                {$user.user.communities.map((community) => community.name).join('/')}
              </TextSm>
            </div>

            <XDivider />

            <TextBase className='mt-4 mb-5 text-center'>
              {$user.user.description}우리집 고양이는 귀엽다
              <br />
              세상에서 제일 귀여움 반박불가
            </TextBase>

            <div className='mb-5'>
              <SubmitButton
                text='1:1 대화하기'
                disabled={$auth.user.id === userId}
                color='primary'
                size='large'
                onClick={async () => {
                  executeWithError(async () => {
                    const roomId = await $chat.createChat(userId)
                    route.chatRoom(roomId)
                  })
                }}
              />
            </div>
          </div>
        </div>
      )}
    </TaskObserver>
  )
}
