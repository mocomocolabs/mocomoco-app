import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FeedForm } from '../components/organisms/FeedFormComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../route'

export interface IFeedWrite {}

export const FeedWrite: FC<IFeedWrite> = () => {
  const { $ui, $feed } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
  })

  return useObserver(() => (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton></BackButton>
          </div>
          <div slot='end'>
            {$feed.insertFeed.match({
              pending: () => <Spinner></Spinner>,
              resolved: () => (
                <IonButton
                  size='small'
                  disabled={!$feed.form.content}
                  onClick={async () => {
                    await $feed.insertFeed($feed.form)
                    route.feed()
                  }}
                >
                  완료
                </IonButton>
              ),
            })}
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <FeedForm></FeedForm>
        </div>
      </IonContent>
    </IonPage>
  ))
}
