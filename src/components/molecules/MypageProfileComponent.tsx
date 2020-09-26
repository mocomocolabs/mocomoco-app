import { IonAvatar, IonButton } from '@ionic/react'
import React from 'react'
import { TextLg } from '../atoms/TextLgComponent'
import { TextXxl } from '../atoms/TextXxlComponent'

export const MypageProfile: React.FC = () => {
  return (
    <div className='flex-row justify-between height-100'>
      <div className='flex-center' slot='start'>
        <IonAvatar className='w-20 height-80'>
          <img src='/assets/img/gyuon_profile.jpg' alt='프로필이미지' />
        </IonAvatar>
      </div>
      <div className='flex-col justify-center w-full ml-4 mr-4' slot='start'>
        <TextXxl className='text-bold'>규온</TextXxl>
        <TextLg className='text-bold gray'>생태마을공동체</TextLg>
      </div>
      <div className='flex-center' slot='end'>
        <IonButton color='dark' fill='outline' href='/my-page'>
          프로필 보기
        </IonButton>
      </div>
    </div>
  )
}
