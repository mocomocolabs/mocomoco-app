import { IonAvatar, IonButton } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextXxl } from '../atoms/TextXxlComponent'

export const MypageProfile: React.FC = () => {
  const { $auth, $user } = useStore()

  useEffect(() => {
    $user.getUser($auth.user.id)
  }, [$user, $auth.user.id])

  return useObserver(() =>
    $user.getUser.match({
      pending: () => <Spinner isFull={true}></Spinner>,
      resolved: () => (
        <div className='flex-row justify-between height-100'>
          <div className='flex-center' slot='start'>
            <IonAvatar className='w-20 height-80'>
              <img src={$user.user.profileUrl} alt='프로필이미지' />
            </IonAvatar>
          </div>
          <div className='flex-col justify-center w-full ml-4 mr-4' slot='start'>
            <TextXxl className='text-bold'>{$user.user.nickname}</TextXxl>
            <TextLg className='text-bold gray'>
              {$user.user.communities.map((community) => community.name).join('/')}
            </TextLg>
          </div>
          <div className='flex-center' slot='end'>
            <IonButton color='dark' fill='outline' onClick={() => route.profileDetail($user.user.id)}>
              프로필 보기
            </IonButton>
          </div>
        </div>
      ),
    })
  )
}
