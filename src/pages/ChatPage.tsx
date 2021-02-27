import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { ChatRoomList } from '../components/organisms/ChatRoomListComponent'
import { useStore } from '../hooks/use-store'

export const ChatPage: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>쪽지보내기</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <ChatRoomList></ChatRoomList>
        </div>
      </IonContent>
    </IonPage>
  )
}
