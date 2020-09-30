import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FeedItem } from '../components/molecules/FeedItemComponent'
import { CommentForm } from '../components/organisms/CommentFormComponent'
import { ContentPopover } from '../components/organisms/ContentPopoverComponent'
import { useStore } from '../hooks/use-store'

export const FeedDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { feed, ui } = useStore()

  useEffect(() => {
    const id = parseInt(match.params.id)
    feed.getFeed(id)
    // eslint-disable-next-line
  }, [])

  useIonViewWillEnter(() => {
    ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    ui.setIsBottomTab(true)
  })

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
            resolved: () => <FeedItem feed={feed.feed} isDetail={true}></FeedItem>,
          })}
        </div>
        <ContentPopover></ContentPopover>
      </IonContent>

      <IonFooter>
        <CommentForm></CommentForm>
      </IonFooter>
    </IonPage>
  ))
}
