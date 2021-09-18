import { IonSlide, IonSlides } from '@ionic/react'
import React, { FC } from 'react'
import { Club } from '../../models/club'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import { ImageWithCorner } from '../molecules/ImageWithCorner'
import { NoContents } from '../molecules/NoContentsComponent'
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
  return clubs.length > 0 ? (
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
              url={v.imageUrls?.[0]}
              isRoundTop={true}
            ></ImageWithCorner>
            <div className='flex-col w-full min-height-92 bg-white px-3 br-b-xxlg text-left'>
              <TextBase className='text-bold mb-1 ellipsis'>{v.name}</TextBase>
              <div className='flex items-center'>
                <Icon name='time' className='icon-secondary' size={12} />
                <TextXs className='ml-1 gray ellipsis'>{v.meetingTime}</TextXs>
              </div>
              <div className='flex items-center'>
                <Icon name='location' className='icon-secondary' size={12} />
                <TextXs className='ml-1 gray ellipsis'>{v.meetingPlace}</TextXs>
              </div>
              <div className='flex justify-between mt-2 gap-1'>
                <div className='ellipsis'>
                  {v.hashtagNames.length ? (
                    <TextXs className='texthashtag ellipsis'>#{v.hashtagNames.join(' #')}</TextXs>
                  ) : (
                    ''
                  )}
                </div>
                <div className='flex-center self-end gap-1'>
                  <Icon name={v.isLike ? 'heart-solid' : 'heart'} className='icon-secondary' size={16} />
                  <TextXs className='secondary'>{v.likeCount}</TextXs>
                </div>
              </div>
            </div>
          </div>
        </IonSlide>
      ))}
    </IonSlides>
  ) : (
    <NoContents className='min-height-210' />
  )
}
