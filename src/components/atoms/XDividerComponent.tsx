import { FC } from 'react'

export interface IXDivider {
  className?: string
}

export const XDivider: FC<IXDivider> = ({ className }) => {
  return <hr className={`bg-primary min-h-1 w-full ${className}`}></hr>
}
