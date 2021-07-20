import dayjs from 'dayjs'
import { FC } from 'react'
import { IFeedSchedule } from '../../models/feed.d'
import { Icon } from '../atoms/IconComponent'
import { TextLg } from '../atoms/TextLgComponent'

export interface IHomeSchedule {
  items: IFeedSchedule[]
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
            <TextLg className='ml-2 ellipsis'>{v.title}</TextLg>
          </div>
          <TextLg className='gray'>{formatSchedule(v.startDate)}</TextLg>
        </li>
      ))}
    </ul>
  )
}
