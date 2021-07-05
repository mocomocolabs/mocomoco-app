import { HTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'
import './IconComponent.scss'

interface IIcon extends HTMLAttributes<HTMLElement> {
  name: string
  className?: string
  small?: boolean
}

export const Icon = ({ name, className = '', onClick = () => {}, small = false }: IIcon) => {
  return (
    <ReactSVG
      onClick={($evt: React.MouseEvent<HTMLElement, MouseEvent>) => onClick($evt)}
      src={`/assets/icon/${name}.svg`}
      className={`${className} svg-icon icon-${small ? '12' : '20'}`}
    />
  )
}
