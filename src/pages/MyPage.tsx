import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { NewsList } from '../components/_example/NewsList'
import { NewsSearch } from '../components/_example/NewsSearch'

export const MyPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>마이페이지</IonTitle>
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
