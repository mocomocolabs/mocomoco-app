import { FC } from 'react'
import { ImageBackground } from '../atoms/ImageBackgroundComponent'
import './ImageWithCorner.scss'

interface IStyle {
  outerDivClass: string
  imageClass: string
  cornerClass: string
  cornerStyle: Record<string, unknown>
  tailDivClass: string
  tailDivStyle: Record<string, unknown>
}
export interface IImageWithCorner {
  height: number | string
  width?: number | string
  url?: string
  isRoundTop?: boolean
  radiusSize?: number
  tailRight?: boolean
  dark?: boolean
  position?: 'top' | 'center' | 'bottom'
  cover?: boolean
}

export const ImageWithCorner: FC<IImageWithCorner> = ({
  height,
  width,
  url,
  isRoundTop,
  radiusSize = 40,
  tailRight = false,
  dark = false,
  position = 'center',
  cover = true,
}) => {
  const { outerDivClass, imageClass, cornerClass, cornerStyle, tailDivClass, tailDivStyle }: IStyle =
    tailRight
      ? {
          outerDivClass: 'inline-flex relative w-full',
          imageClass: `br-l-xxlg ${dark ? 'dark' : ''}`,
          cornerClass: 'icon-rotate-270 absolute top-0',
          cornerStyle: { right: radiusSize, width: radiusSize, height: radiusSize },
          tailDivClass: 'z-10 w-full h-full bg-white absolute right-0 right-radius border-white',
          tailDivStyle: { width: radiusSize, borderBottomLeftRadius: radiusSize },
        }
      : {
          outerDivClass: 'relative w-full',
          imageClass: `${isRoundTop ? 'br-t-xxlg' : ''} ${dark ? 'dark' : ''}`,
          cornerClass: 'absolute right-0',
          cornerStyle: { bottom: radiusSize, width: radiusSize, height: radiusSize },
          tailDivClass: 'z-10 w-full bg-white absolute bottom-0 bottom-radius border-white',
          tailDivStyle: { height: radiusSize, borderTopLeftRadius: radiusSize },
        }

  return (
    <div className={outerDivClass}>
      <ImageBackground
        style={{
          height,
          width,
          backgroundSize: cover ? 'cover' : 'contain',
          backgroundPosition: position,
        }}
        url={url}
        className={imageClass}
      />
      <img src='/assets/img/corner.svg' style={cornerStyle} className={cornerClass} alt='' />
      <div className={tailDivClass} style={tailDivStyle} />
    </div>
  )
}
