import { FC, ReactNode } from 'react'
import { TextBase } from '../atoms/TextBaseComponent'

export interface INoContents {
  isFull?: boolean
  className?: string
  children?: ReactNode
}

export const NoContents: FC<INoContents> = ({ className, isFull = false, children }) => {
  return (
    <div className={`${className} ${isFull ? 'absolute-center' : ''} w-full flex-center`}>
      <div className='flex-col flex-center gap-2'>
        <img src='/assets/img/no-image-bird.png' />
        <TextBase className='text-center gray preline'>{children ?? <p>창고가 텅 비었어요</p>}</TextBase>
      </div>
    </div>
  )
}
