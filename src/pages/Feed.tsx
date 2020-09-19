import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { NewsList } from '../components/example/NewsList'
import { NewsSearch } from '../components/example/NewsSearch'

export const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
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
