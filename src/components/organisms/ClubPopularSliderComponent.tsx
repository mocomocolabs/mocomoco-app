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

export interface IClubPopularSlider {
  clubs: Club[]
}

const slideOpts = {
  initialSlide: 0,
  spaceBetween: 8,
  slidesPerView: 'auto',
  speed: 400,
}

export const ClubPopularSlider: FC<IClubPopularSlider> = ({ clubs }) => {
  return clubs.length ? (
    <IonSlides
      key={clubs.map((v) => v.id).join('_')}
      pager={false}
      options={slideOpts}
      className='pb-3 club-popular'
    >
      {clubs.map((v, i) => (
        <IonSlide className='w-auto' key={i} onClick={() => route.clubDetail(v.id)}>
          <div className='flex-col width-160 br-xxlg shadow pb-2'>
            <ImageWithCorner
              height={130}
              radiusSize={12}
              url={v.imageUrls?.slice(-1).pop()}
              isRoundTop={true}
            ></ImageWithCorner>
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
                <TextXs className='secondary mt-2 ellipsis'>#{v.hashtagNames?.join(' #')}</TextXs>
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
