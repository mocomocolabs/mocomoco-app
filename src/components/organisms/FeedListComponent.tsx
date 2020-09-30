import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { FeedItem } from '../molecules/FeedItemComponent'
import { ContentPopover } from './ContentPopoverComponent'

interface IFeedList {}

export const FeedList: React.FC<IFeedList> = () => {
  const { feed } = useStore()

  useEffect(() => {
    feed.getFeeds()
    // eslint-disable-next-line
  }, [])

  return useObserver(() =>
    feed.getFeeds.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <>
          <ul className='pl-0 move-up'>
            {feed.feeds.map((v, i) => (
              <FeedItem key={i} feed={v} isDetail={false}></FeedItem>
            ))}
          </ul>
          <ContentPopover></ContentPopover>
        </>
      ),
    })
  )
}
