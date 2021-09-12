import { CSSProperties, FC } from 'react'

export interface IImageBackground {
  className?: string
  url?: string
  style?: CSSProperties
}

export const ImageBackground: FC<IImageBackground> = ({ className = '', url, style }) => (
  <div
    className={`${className ? className : 'w-full height-250'}`}
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: style?.backgroundSize || 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: style?.backgroundPosition || 'center',
      ...style,
    }}
  ></div>
)
