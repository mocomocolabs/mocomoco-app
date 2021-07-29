import { HTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'
import './IconComponent.scss'

export type IconSize = 12 | 16 | 20 | 24 | 28 | 32 | 50

interface IIcon extends HTMLAttributes<HTMLElement> {
  name: string
  className?: string
  size?: IconSize
}

export const Icon = ({ name, className = '', onClick = () => {}, size = 24 }: IIcon) => {
  return (
    <ReactSVG
      onClick={($evt: React.MouseEvent<HTMLElement, MouseEvent>) => onClick($evt)}
      src={`/assets/icon/${name}.svg`}
      className={`${className} svg-icon icon-${size}`}
    />
  )
}
