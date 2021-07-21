import { FC } from 'react'
import { TextXxs } from './TextXxsComponent'

export interface ISquareWithCorner {
  color?: 'primary' | 'secondary' | 'gray' | undefined
  width?: number
  height?: number
  fill?: boolean
  children?: React.ReactNode
}

export const SquareWithCorner: FC<ISquareWithCorner> = ({
  color = 'secondary',
  width = 38,
  height = 16,
  fill = false,
  children,
}) => {
  return (
    <TextXxs
      className={`flex-center no-wrap ${height <= 30 ? 'br-xxlg' : 'br-xxxlg'} px-1 ${
        fill ? `text-bold ${color === 'primary' ? 'black' : 'white'} bg-${color}` : `${color} border-${color}`
      }`}
      style={{
        minWidth: width,
        minHeight: height,
      }}
    >
      {children}
    </TextXxs>
  )
}
