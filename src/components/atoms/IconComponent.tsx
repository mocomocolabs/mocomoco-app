import { HTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'
import './IconComponent.scss'

interface IIcon extends HTMLAttributes<HTMLElement> {
  name: string
  className?: string
}

export const Icon = ({ name, className = '', onClick = () => {} }: IIcon) => {
  return (
    <ReactSVG
      onClick={($evt: React.MouseEvent<HTMLElement, MouseEvent>) => onClick($evt)}
      src={`/assets/icon/${name}.svg`}
      className={`${className} svg-icon flex items-center icon-20`}
    ></ReactSVG>
  )
}
