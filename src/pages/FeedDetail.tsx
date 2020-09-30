import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FeedItem } from '../components/molecules/FeedItemComponent'
import { ContentPopover } from '../components/organisms/ContentPopoverComponent'
import { useStore } from '../hooks/use-store'

export const FeedDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { feed } = useStore()

  useEffect(() => {
    const id = parseInt(match.params.id)
    feed.getFeed(id)
    // eslint-disable-next-line
  }, [])

  return useObserver(() => (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton></BackButton>
          </div>
          <div slot='end'></div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          {feed.getFeed.match({
            pending: () => <Spinner isFull={true}></Spinner>,
            resolved: () => <FeedItem feed={feed.feed}></FeedItem>,
          })}
        </div>
        <ContentPopover></ContentPopover>
      </IonContent>
    </IonPage>
  ))
}
