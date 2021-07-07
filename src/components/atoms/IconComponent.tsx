import { HTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'
import './IconComponent.scss'

interface IIcon extends HTMLAttributes<HTMLElement> {
  name: string
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export const Icon = ({ name, className = '', onClick = () => {}, size = 'large' }: IIcon) => {
  return (
    <ReactSVG
      onClick={($evt: React.MouseEvent<HTMLElement, MouseEvent>) => onClick($evt)}
      src={`/assets/icon/${name}.svg`}
      className={`${className} svg-icon icon-${size === 'small' ? '12' : size === 'medium' ? '16' : '20'}`}
    />
  )
}
