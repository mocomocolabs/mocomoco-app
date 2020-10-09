import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { create } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { CommunityBanner } from '../components/organisms/CommunityBannerComponent'
import { FeedList } from '../components/organisms/FeedListComponent'

export const Feed: React.FC = () => {
  const history = useHistory()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <CommunitySelector></CommunitySelector>
          </div>
          <div slot='end' onClick={() => history.push('/feed/write')}>
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
