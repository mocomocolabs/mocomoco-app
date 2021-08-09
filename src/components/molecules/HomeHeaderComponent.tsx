import { FC } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXl } from '../atoms/TextXlComponent'

export interface IHomeHeader {
  name: string | undefined
  count: number | undefined
}

export const HomeHeader: FC<IHomeHeader> = ({ name, count }) => {
  return (
    <>
      <div className='flex items-center'>
        <Icon name='home' size={28}></Icon>
        <TextXl className='ml-2 text-bold'>{name}</TextXl>
      </div>

      <div className='flex items-center'>
        <Icon name='group-solid' className='icon-primary' size={20}></Icon>
        <TextBase className='primary ml-1'>{count}명</TextBase>
      </div>
    </>
  )
}
