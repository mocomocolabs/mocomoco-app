import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { create } from 'ionicons/icons'
import React from 'react'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { CommunityBanner } from '../components/organisms/CommunityBanner'
import { FeedList } from '../components/organisms/FeedListComponent'

export const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <CommunitySelector></CommunitySelector>
          </div>
          <div slot='end'>
            <IonIcon icon={create}></IonIcon>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <CommunityBanner></CommunityBanner>
          <FeedList />
        </div>
      </IonContent>
    </IonPage>
  )
}
