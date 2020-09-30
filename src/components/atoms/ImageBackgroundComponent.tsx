import React, { FC } from 'react'

export interface IImageBackground {
  className?: string
  url?: string
}

export const ImageBackground: FC<IImageBackground> = ({ className = '', url }) => (
  <div
    className={`${className ? className : 'w-full height-250'}`}
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  ></div>
)
