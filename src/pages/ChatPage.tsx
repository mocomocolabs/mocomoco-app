import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { Icon } from '../components/atoms/IconComponent'
import { TextXl } from '../components/atoms/TextXlComponent'
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
          <TextXl className='text-bold'>전체 채팅</TextXl>
          <Icon name='arrow' className='ml-2 icon-rotate-270'></Icon>
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
