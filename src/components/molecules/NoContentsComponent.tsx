import { FC } from 'react'
import { TextBase } from '../atoms/TextBaseComponent'

export interface INoContents {
  show?: boolean
  isFull?: boolean
  className?: string
}

export const NoContents: FC<INoContents> = ({ className, show = true, isFull = false }) => {
  return (
    <div
      hidden={!show}
      className={`${className} ${isFull ? 'absolute-center' : ''} w-full flex-col items-center gap-2`}
    >
      <img src='/assets/img/no-image-bird.png' />
      <TextBase className='gray'>창고가 텅 비었어요</TextBase>
    </div>
  )
}
