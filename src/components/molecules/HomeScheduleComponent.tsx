import dayjs from 'dayjs'
import { FC } from 'react'
import { Feed } from '../../models/feed'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'

export interface IHomeSchedule {
  items: Feed[]
  className?: string
}

const formatSchedule = (yyyymmdd: string) => dayjs(yyyymmdd).format('M월 D일')

export const HomeSchedule: FC<IHomeSchedule> = ({ items, className }) => {
  return (
    <ul className={className}>
      {items.map((v) => (
        <li key={v.id} className='flex-between-center'>
          <div className='flex items-center w-3/4'>
            <Icon name='calendar' className='icon-secondary'></Icon>
            <TextBase className='ml-2 ellipsis'>{v.scheduleTitle}</TextBase>
          </div>
          <TextBase className='gray'>{formatSchedule(v.scheduleDate)}</TextBase>
        </li>
      ))}
    </ul>
  )
}
