import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { settings } from 'ionicons/icons'
import React from 'react'
import { MypageColumnList } from '../components/molecules/MypageColumnListComponent'
import { MypageProfile } from '../components/molecules/MypageProfileComponent'
import { MypageRowList } from '../components/molecules/MypageRowListComponent'

export const MyPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='start'>마이페이지</IonTitle>
          <IonIcon icon={settings} slot='end' />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container my-4'>
          <MypageProfile />
          <hr className='x-divider' />
          <MypageRowList />
          <hr className='x-divider' />
          <MypageColumnList />
        </div>
      </IonContent>
    </IonPage>
  )
}
