import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import React from 'react'
import { CommunitySelector } from '../components/organisms/CommunitySelectorComponent'
import { NewsList } from '../components/_example/NewsList'
import { NewsSearch } from '../components/_example/NewsSearch'

export const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <CommunitySelector></CommunitySelector>
          </div>
          <div slot='end'>글쓰기버튼</div>
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
