import { IonAvatar } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextXxl } from '../atoms/TextXxlComponent'

interface IProfileDetailItem {
  userId: number
}

export const ProfileDetailItem: React.FC<IProfileDetailItem> = ({ userId }) => {
  const { $user } = useStore()

  useEffect(() => {
    $user.getUser(userId)
  }, [$user, userId])

  //TODO performance 확인 - render 횟수 등
  return useObserver(() =>
    $user.getUser.match({
      pending: () => {
        return <Spinner isFull={true}></Spinner>
      },
      resolved: () => {
        return (
          <div className='flex-col item-center my-4'>
            <IonAvatar className='w-30 h-30 my-8 self-center'>
              <img src={$user.user.profileUrl} alt='프로필이미지' />
            </IonAvatar>

            <TextXxl className='mb-4 text-center text-bold'>
              {$user.user.nickname} ({$user.user.name})
            </TextXxl>
            <TextXxl className='mb-4 text-center'>{$user.user.community}</TextXxl>

            <TextXxl className='mb-4 text-center'>{$user.user.status}</TextXxl>

            <TextXxl className='mb-4 text-center'>
              {$user.user.mobile} ({$user.user.mobileOpen === 'on' ? '공개' : '비공개'})
            </TextXxl>

            <TextXxl className='mb-4 text-center'>
              {$user.user.email} ({$user.user.emailOpen === 'on' ? '공개' : '비공개'})
            </TextXxl>
          </div>
        )
      },
    })
  )
}
