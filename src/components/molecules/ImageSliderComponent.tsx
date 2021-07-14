import { IonSlide, IonSlides } from '@ionic/react'
import { FC } from 'react'
import './ImageSliderComponent.scss'
import { ImageWithCorner } from './ImageWithCorner'

export interface IImageSlider {
  urls: string[]
}

const slideOpts = {
  spaceBetween: 0,
  speed: 400,
}

export const ImageSlider: FC<IImageSlider> = ({ urls }) =>
  urls.length ? (
    <IonSlides key={urls.join('_')} pager={urls.length > 1} options={slideOpts}>
      {urls?.map((v, i) => (
        <IonSlide key={i}>
          <ImageWithCorner height={337} url={v} />
        </IonSlide>
      ))}
    </IonSlides>
  ) : (
    <></>
  )
