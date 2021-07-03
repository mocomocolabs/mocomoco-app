import { FC } from 'react'

export interface IProfileImageComponent {
  url?: string
  className?: string
}

const avatarUrl = '/assets/img/avatar.png'

export const ProfileImage: FC<IProfileImageComponent> = ({ url = avatarUrl, className }) => {
  return <img className={`shadow br-full w-10 h-10 ${className}`} src={url} alt='' />
}
