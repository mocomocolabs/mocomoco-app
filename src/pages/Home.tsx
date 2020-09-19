import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { NewsList } from '../components/example/NewsList'
import { NewsSearch } from '../components/example/NewsSearch'

export const Home: React.FC = () => {
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
