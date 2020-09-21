import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { NewsItem } from './NewsItem'

interface INewsList {}

export const NewsList: React.FC<INewsList> = () => {
  const { news } = useStore()

  useEffect(() => {
    news.getNews()
    // eslint-disable-next-line
  }, [])

  return useObserver(() =>
    news.getNews.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <ul className='pl-0 move-up'>
          {news.news.map((v, i) => (
            <NewsItem
              key={i}
              id={v.id}
              title={v.title}
              domain={v.domain}
              user={v.user}
              comments_count={v.comments_count}
              time_ago={v.time_ago}
            ></NewsItem>
          ))}
        </ul>
      ),
    })
  )
}
