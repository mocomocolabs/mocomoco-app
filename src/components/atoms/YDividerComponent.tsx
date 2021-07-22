import { FC } from 'react'
import { IXDivider } from './XDividerComponent'
import './XDividerComponent.scss'

export const YDivider: FC<IXDivider> = ({ className }) => {
  return <hr className={`hr-primary min-w-1 h-full my-0 ${className}`}></hr>
}
