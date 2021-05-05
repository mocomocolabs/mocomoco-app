import { FC } from 'react'
import { ImageBackground } from '../atoms/ImageBackgroundComponent'
import './ImageWithCorner.scss'

export interface IImageWithCorner {
  height: number
  url?: string
  isRoundTop?: boolean
}

export const ImageWithCorner: FC<IImageWithCorner> = ({ height, url, isRoundTop }) => {
  return (
    <div className='relative'>
      <ImageBackground
        style={{ height }}
        url={url}
        className={isRoundTop ? 'br-t-xxlg' : ''}
      ></ImageBackground>
      <img
        src='/assets/img/corner.svg'
        style={{ top: height - 26 }}
        className='corner absolute right-0'
        alt=''
      />
      <div className='z-10 w-full h-3 bg-white absolute bottom-0 br-tl-xxlg'></div>
    </div>
  )
}
