import React, { FC } from 'react'

export interface IXDivider {}

export const XDivider: FC<IXDivider> = () => {
  return <hr className='bg-m-border min-h-1 w-full'></hr>
}
