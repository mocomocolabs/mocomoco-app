import { ReactSVG } from 'react-svg'

interface IIcon {
  name: string
  className?: string
}

export const Icon = ({ name, className = '' }: IIcon) => {
  return <ReactSVG src={`/assets/icon/${name}.svg`} className={className}></ReactSVG>
}
