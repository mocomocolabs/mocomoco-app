import { IonSlide, IonSlides } from '@ionic/react'
import React, { FC } from 'react'
import { Club } from '../../models/club'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import { ImageWithCorner } from '../molecules/ImageWithCorner'
import './ClubPopularSlideComponent.scss'

export interface IClubPopularSlide {
  clubs: Club[]
}

export const ClubPopularSlide: FC<IClubPopularSlide> = ({ clubs }) => {
  const slideOpts = {
    initialSlide: 0,
    spaceBetween: 8,
    slidesPerView: 'auto',
    speed: 400,
  }

  return clubs.length ? (
    <IonSlides pager={false} options={slideOpts} className='pb-3'>
      {clubs.map((v, i) => (
        <IonSlide className='w-auto' key={i} onClick={() => route.clubDetail(v.id)}>
          <div className='flex-col width-160 br-xxlg shadow pb-2'>
            <ImageWithCorner height={130} url={v.imageUrls?.slice(-1).pop()}></ImageWithCorner>
            <div className='flex-col w-full height-92 bg-white px-3 br-b-xxlg text-left'>
              <TextBase className='text-bold'>{v.name}</TextBase>
              <div className='flex items-center'>
                <Icon name='time' className=''></Icon>
                <TextXs className='ml-1'>{v.meetingTime}</TextXs>
              </div>
              <div className='flex items-center'>
                <Icon name='time' className=''></Icon>
                <TextXs className='ml-1'>{v.meetingPlace}</TextXs>
              </div>
              {v.hashtagNames.length ? (
                <TextXs className='green mt-2 ellipsis'>#{v.hashtagNames?.join(' #')}</TextXs>
              ) : (
                ''
              )}
            </div>
          </div>
        </IonSlide>
      ))}
    </IonSlides>
  ) : (
    <Spinner></Spinner>
  )
}
