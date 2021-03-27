import { HTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'

interface IIcon extends HTMLAttributes<HTMLElement> {
  name: string
  className?: string
}

export const Icon = ({ name, className = '', onClick = () => {} }: IIcon) => {
  return (
    <ReactSVG
      onClick={($evt: any) => onClick($evt)}
      src={`/assets/icon/${name}.svg`}
      className={`${className} flex items-center icon-20`}
    ></ReactSVG>
  )
}
