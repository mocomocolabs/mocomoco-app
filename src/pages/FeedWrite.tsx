import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FeedForm } from '../components/organisms/FeedFormComponent'
import { useStore } from '../hooks/use-store'

export interface IFeedWrite {}

export const FeedWrite: FC<IFeedWrite> = () => {
  const { $ui } = useStore()

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
          <div slot='end'></div>
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
