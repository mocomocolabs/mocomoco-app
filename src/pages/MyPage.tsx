import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { settingsOutline } from 'ionicons/icons'
import React from 'react'
import { XDivider } from '../components/atoms/XDividerComponent'
import { MypageColumnList } from '../components/molecules/MypageColumnListComponent'
import { MypageProfile } from '../components/molecules/MypageProfileComponent'
import { MypageRowList } from '../components/molecules/MypageRowListComponent'

export const MyPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='start'>마이페이지</IonTitle>
          <IonButtons slot='primary'>
            <IonButton slot='end' color='dark' routerLink='/settings'>
              <IonIcon slot='icon-only' icon={settingsOutline} size='small' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container my-4'>
          <MypageProfile />
          <XDivider />
          <MypageRowList />
          <XDivider />
          <MypageColumnList />
        </div>
      </IonContent>
    </IonPage>
  )
}
