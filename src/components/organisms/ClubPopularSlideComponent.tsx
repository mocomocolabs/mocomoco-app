import { IonSlide, IonSlides } from '@ionic/react'
import React, { FC } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import { ImageWithCorner } from '../molecules/ImageWithCorner'
import './ClubPopularSlideComponent.scss'

export interface IClubPopularSlide {}

export const ClubPopularSlide: FC<IClubPopularSlide> = () => {
  const slideOpts = {
    initialSlide: 0,
    spaceBetween: 8,
    slidesPerView: 'auto',
    speed: 400,
  }

  return (
    <IonSlides pager={false} options={slideOpts} className='pb-3'>
      <IonSlide className='w-auto'>
        <div className='flex-col width-160 br-xxlg shadow pb-2'>
          <ImageWithCorner height={130} url='/assets/img/club/club01.jpg'></ImageWithCorner>
          <div className='flex-col w-full bg-white px-3 br-b-xxlg text-left'>
            <TextBase className='text-bold'>뜨개질 모임</TextBase>
            <div className='flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>매주 수요일 저녁 8:30</TextXs>
            </div>
            <div className='flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>온라인</TextXs>
            </div>
            <TextXs className='green mt-2'>#뜨개질 #취미</TextXs>
          </div>
        </div>
      </IonSlide>
      <IonSlide className='w-auto'>
        <div className='flex-col width-160 br-xxlg shadow pb-2'>
          <ImageWithCorner height={130} url='/assets/img/club/club01.jpg'></ImageWithCorner>
          <div className='flex-col w-full bg-white px-3 br-b-xxlg text-left'>
            <TextBase className='text-bold'>뜨개질 모임</TextBase>
            <div className='flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>매주 수요일 저녁 8:30</TextXs>
            </div>
            <div className='flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>온라인</TextXs>
            </div>
            <TextXs className='green mt-2'>#뜨개질 #취미</TextXs>
          </div>
        </div>
      </IonSlide>
    </IonSlides>
  )
}
