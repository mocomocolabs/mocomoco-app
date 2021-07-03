import { FC } from 'react'
import { ImageBackground } from '../atoms/ImageBackgroundComponent'
import './ImageWithCorner.scss'

export interface IImageWithCorner {
  height: number
  url?: string
  isRoundTop?: boolean
  radiusSize?: number
}

export const ImageWithCorner: FC<IImageWithCorner> = ({ height, url, isRoundTop, radiusSize = 40 }) => {
  return (
    <div className='relative w-full'>
      <ImageBackground
        style={{ height }}
        url={url}
        className={isRoundTop ? 'br-t-xxlg' : ''}
      ></ImageBackground>
      <img
        src='/assets/img/corner.svg'
        style={{ top: height - radiusSize * 2, width: radiusSize, height: radiusSize }}
        className='absolute right-0'
        alt=''
      />
      <div
        className='z-10 w-full bg-white absolute bottom-0 bottom-radius'
        style={{ height: radiusSize, borderTopLeftRadius: radiusSize }}
      ></div>
    </div>
  )
}
