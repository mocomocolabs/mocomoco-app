import { IonSlide, IonSlides } from '@ionic/react'
import { FC } from 'react'
import './ImageSliderComponent.scss'
import { ImageWithCorner } from './ImageWithCorner'

export interface IImageSlider {
  urls: string[]
  height?: number | string
  bg?: string
  position?: 'top' | 'center' | 'bottom'
  cover?: boolean
}

const slideOpts = {
  spaceBetween: 0,
  speed: 400,
}

export const ImageSlider: FC<IImageSlider> = ({ urls, height = 337, bg, position, cover }) =>
  urls.length ? (
    <IonSlides
      key={urls.join('_')}
      pager={urls.length > 1}
      options={slideOpts}
      style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}
    >
      {urls?.map((v, i) => (
        <IonSlide key={i}>
          <ImageWithCorner height={height} url={v} position={position} cover={cover} />
        </IonSlide>
      ))}
    </IonSlides>
  ) : (
    <></>
  )
