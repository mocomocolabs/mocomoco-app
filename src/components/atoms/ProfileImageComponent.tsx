import { FC } from 'react'

export interface IProfileImageComponent {
  url: string
  className?: string
}

export const ProfileImage: FC<IProfileImageComponent> = ({ url, className }) => {
  return <img className={`br-full w-8 h-8 ${className}`} src={url} alt='' />
}
