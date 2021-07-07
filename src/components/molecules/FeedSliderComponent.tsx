import { IonSlide, IonSlides } from '@ionic/react'
import { FC } from 'react'
import { Feed } from '../../models/feed'
import { route } from '../../services/route-service'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import './FeedSliderComponent.scss'
import { ImageWithCorner } from './ImageWithCorner'

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
  return items.length ? (
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
              url={v.imageUrls?.slice(-1).pop() ?? '/assets/img/no-image.png'}
              radiusSize={12}
              isRoundTop={true}
            ></ImageWithCorner>
            <div className='flex-col w-full h-10 bg-white px-3 br-b-xxlg text-left'>
              <TextBase className='text-bold ellipsis'>{v.title ?? v.content}</TextBase>
              {v.title && <TextXs className='ellipsis'>{v.content}</TextXs>}
            </div>
          </div>
        </IonSlide>
      ))}
    </IonSlides>
  ) : (
    // TODO: 내용이 없습니다
    <Spinner></Spinner>
  )
}
