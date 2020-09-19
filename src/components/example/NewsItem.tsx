import { IonIcon } from '@ionic/react'
import { heart, person } from 'ionicons/icons'
import React from 'react'
import { INews } from '../../models/example/news'

export const NewsItem: React.FC<INews> = ({ title, user, domain, comments_count, time_ago }) => {
  return (
    <li className='br-sm my-2 shadow-md'>
      <div className='flex-col p-2'>
        <div className='ellipsis text-xxl'>
          <strong>{title}</strong>
        </div>
        <div className='blue'>{domain}</div>
        <div className='flex-between-center'>
          <div className='flex-center'>
            <IonIcon icon={person} slot='start' />
            <div className='ml-2'>{user}</div>
          </div>
          <div className='text-right'>
            <div className='flex justify-end'>
              <IonIcon icon={heart} slot='start' className='red mr1' />
              <span>{comments_count}</span>
            </div>
            <div className='dark-gray'>{time_ago}</div>
          </div>
        </div>
      </div>
    </li>
  )
}
