import { IonSlide, IonSlides } from '@ionic/react'
import { FC } from 'react'
import { Feed } from '../../models/feed'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import './FeedSliderComponent.scss'
import { ImageWithCorner } from './ImageWithCorner'
import { NoContents } from './NoContentsComponent'

export interface IFeedSlider {
  items: Feed[]
}

const slideOpts = {
  initialSlide: 0,
  spaceBetween: 8,
  slidesPerView: 'auto',
  speed: 400,
}

export const FeedSlider: FC<IFeedSlider> = ({ items }) => {
  return items.length > 0 ? (
    <IonSlides
      key={items.map((v) => v.id).join('_')}
      pager={false}
      options={slideOpts}
      className='pb-3 feed-slider'
    >
      {items.map((v, i) => (
        <IonSlide className='w-auto' key={i} onClick={() => route.feedDetail(v.id)}>
          <div className='flex-col width-308 br-xxlg shadow pb-3'>
            <ImageWithCorner
              height={162}
              url={v.imageUrls?.slice(-1).pop() ?? '/assets/img/no-image-wide.png'}
              radiusSize={12}
              isRoundTop={true}
            ></ImageWithCorner>
            <div className='flex-col w-full bg-white px-3 br-b-xxlg text-left'>
              <TextBase className='text-bold ellipsis'>{v.title ? v.title : v.content}</TextBase>
              <div className='flex-between-center gap-2 -mb-1'>
                <div className='overflow-hidden'>
                  {v.title && <TextXs className='ellipsis'>{v.content}</TextXs>}
                </div>
                <div className='flex-center justify-end gap-1' style={{ flex: '1 0 0' }}>
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
    <NoContents className='min-height-230' />
  )
}
