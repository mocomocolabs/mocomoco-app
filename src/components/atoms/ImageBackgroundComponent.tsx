import { FC } from 'react'

export interface IImageBackground {
  className?: string
  url?: string
  style?: any
}

export const ImageBackground: FC<IImageBackground> = ({ className = '', url, style }) => (
  <div
    className={`${className ? className : 'w-full height-250'}`}
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      ...style,
    }}
  ></div>
)
