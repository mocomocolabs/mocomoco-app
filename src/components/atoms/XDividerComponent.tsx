import React, { FC } from 'react'

export interface IXDivider {}

export const XDivider: FC<IXDivider> = () => {
  return <div className='bg-m-border min-h-1 w-full'></div>
}
