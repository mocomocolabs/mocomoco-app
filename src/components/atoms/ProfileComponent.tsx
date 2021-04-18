import { FC } from 'react'

export interface IProfileComponent {
  url: string
  className?: string
}

export const Profile: FC<IProfileComponent> = ({ url, className }) => {
  return <img className={`br-full w-8 h-8 w-4 h-4 ${className}`} src={url} alt='' />
}
