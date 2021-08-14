import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { ChatroomTypeSelector } from '../components/molecules/ChatroomTypeSelectorComponent'
import { ChatRoomList } from '../components/organisms/ChatRoomListComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'

export const ChatPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  return (
    <IonPage>
      <Header>
        <div className='flex items-center'>
          <ChatroomTypeSelector />
        </div>
      </Header>

      <IonContent>
        <div className='px-container'>
          <ChatRoomList></ChatRoomList>
        </div>
      </IonContent>
    </IonPage>
  )
}
