import React, { FC } from 'react'

export interface IPad {
  className?: string
}

export const Pad: FC<IPad> = ({ className }) => {
  return <div className={`${className} flex w-px h-px`}></div>
}
