import { IonSlide, IonSlides } from '@ionic/react'
import { FC } from 'react'
import { ImageWithCorner } from './ImageWithCorner'

export interface IImageSlider {
  urls: string[]
  dark?: boolean
}

const slideOpts = {
  spaceBetween: 0,
  speed: 400,
}

export const ImageSlider: FC<IImageSlider> = ({ urls, dark = false }) =>
  urls.length ? (
    <IonSlides key={urls.join('_')} pager={urls.length > 1} options={slideOpts}>
      {urls?.map((v, i) => (
        <IonSlide key={i}>
          <ImageWithCorner height={337} url={v} dark={dark}></ImageWithCorner>
        </IonSlide>
      ))}
    </IonSlides>
  ) : (
    <></>
  )
