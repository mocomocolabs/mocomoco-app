import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
import { NewsList } from '../components/_example/NewsList'
import { NewsSearch } from '../components/_example/NewsSearch'
import { useStore } from '../hooks/use-store'

export const Home: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>메인페이지</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <NewsSearch />
          <NewsList />
        </div>
      </IonContent>
    </IonPage>
  )
}
