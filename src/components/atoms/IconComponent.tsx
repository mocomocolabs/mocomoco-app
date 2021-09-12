import { HTMLAttributes, useCallback } from 'react'
import { ReactSVG } from 'react-svg'
import './IconComponent.scss'

export type IconSize = 12 | 16 | 20 | 24 | 28 | 32 | 50

interface IIcon extends HTMLAttributes<HTMLElement> {
  name: string
  className?: string
  size?: IconSize
}

export const Icon = ({ name, className = '', onClick = () => {}, size = 24, color = 'black' }: IIcon) => {
  const preventDefault = useCallback(async (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.preventDefault()
  }, [])

  return (
    <ReactSVG
      onClick={($evt: React.MouseEvent<HTMLElement, MouseEvent>) => onClick($evt)}
      src={`/assets/icon/${name}.svg`}
      className={`${className} svg-icon icon-${size} icon-${color}`}
      // android에서 버튼 누른 후에도 키보드 게속 표시되게 하려면 mousedown 이벤트를 막아야 한다.
      onMouseDown={preventDefault}
    />
  )
}
