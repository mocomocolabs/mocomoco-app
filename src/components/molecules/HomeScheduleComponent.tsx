import dayjs from 'dayjs'
import { FC } from 'react'
import { IFeedSchedule } from '../../models/feed.d'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'

export interface IHomeSchedule {
  items: IFeedSchedule[]
  className?: string
}

const formatSchedule = (yyyymmdd: string) => dayjs(yyyymmdd).format('M월 D일')

export const HomeSchedule: FC<IHomeSchedule> = ({ items, className }) => {
  return (
    <ul className={className}>
      {items.map((v) => (
        <li key={v.id} className='flex-between-center' onClick={() => route.feedDetail(v.feedId)}>
          <div className='flex items-center gap-2 ellipsis'>
            <Icon name='calendar' className='icon-secondary' />
            <TextBase className='ellipsis'>{v.title}</TextBase>
          </div>
          <TextBase className='flex-none gray'>{formatSchedule(v.startDate)}</TextBase>
        </li>
      ))}
    </ul>
  )
}
