import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import { useEffect } from 'react'
import { Icon } from '../components/atoms/IconComponent'
import { TextXl } from '../components/atoms/TextXlComponent'
import { ChatRoomList } from '../components/organisms/ChatRoomListComponent'
import { useStore } from '../hooks/use-store'

export const ChatPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='flex items-center'>
            <Icon name='arrow' className='icon-rotate-270'></Icon>
            <TextXl className='ml-2 text-bold'>전체 채팅</TextXl>
          </div>
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
