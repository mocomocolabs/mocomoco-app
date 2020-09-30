import { IonSlide, IonSlides } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ImageBackground } from '../atoms/ImageBackgroundComponent'

export interface IImageSlider {
  urls: string[]
}

const slideOpts = {
  initialSlide: 1,
  speed: 400,
}

export const ImageSlider: FC<IImageSlider> = ({ urls }) => {
  return useObserver(() => (
    <div>
      <IonSlides pager={true} options={slideOpts}>
        {urls.map((v, i) => (
          <IonSlide key={i}>
            <ImageBackground className='w-full height-250' url={v}></ImageBackground>
          </IonSlide>
        ))}
      </IonSlides>
    </div>
  ))
}
