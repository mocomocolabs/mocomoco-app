import { IonAvatar, IonButton } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useStore } from '../../hooks/use-store'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextXxl } from '../atoms/TextXxlComponent'

export const MypageProfile: React.FC = () => {
  const { $user } = useStore()
  const history = useHistory()

  // eslint-disable-next-line
  const getCurrentUserTaskGroup = TaskGroup<any[], void>([$user.getCurrentUserId, $user.getUser])

  useEffect(() => {
    const getCurrentUser = async () => {
      await $user.getCurrentUserId()
      await $user.getUser($user.currentUserId!)
    }

    getCurrentUser()
  }, [$user])

  return useObserver(() =>
    getCurrentUserTaskGroup.match({
      pending: () => {
        return (
          <div className='flex-center'>
            <Spinner isFull={true}></Spinner>
          </div>
        )
      },
      resolved: () => (
        <div className='flex-row justify-between height-100'>
          <div className='flex-center' slot='start'>
            <IonAvatar className='w-20 height-80'>
              <img src={$user.user.profileUrl} alt='프로필이미지' />
            </IonAvatar>
          </div>
          <div className='flex-col justify-center w-full ml-4 mr-4' slot='start'>
            <TextXxl className='text-bold'>{$user.user.nickname}</TextXxl>
            <TextLg className='text-bold gray'>{$user.user.community}</TextLg>
          </div>
          <div className='flex-center' slot='end'>
            <IonButton color='dark' fill='outline' onClick={() => history.push(`/users/${$user.user.id}`)}>
              프로필 보기
            </IonButton>
          </div>
        </div>
      ),
    })
  )
}
