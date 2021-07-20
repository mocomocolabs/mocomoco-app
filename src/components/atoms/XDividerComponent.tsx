import { FC } from 'react'
import './XDividerComponent.scss'

export interface IXDivider {
  className?: string
}

export const XDivider: FC<IXDivider> = ({ className }) => {
  return <hr className={`hr-primary min-h-1 w-full my-0 ${className}`}></hr>
}
