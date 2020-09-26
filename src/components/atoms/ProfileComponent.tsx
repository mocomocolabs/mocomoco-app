import React, { FC } from 'react'

export interface IProfileComponent {
  url: string
}

export const Profile: FC<IProfileComponent> = ({ url }) => {
  return <img className='br-full w-8 h-8' src={url} alt='' />
}
