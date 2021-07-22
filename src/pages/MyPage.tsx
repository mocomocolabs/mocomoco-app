import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { Icon } from '../components/atoms/IconComponent'
import { Pad } from '../components/atoms/PadComponent'
import { TextXl } from '../components/atoms/TextXlComponent'
import { MypageColumnList } from '../components/molecules/MypageColumnListComponent'
import { MypageProfile } from '../components/molecules/MypageProfileComponent'
import { MypageRowList } from '../components/molecules/MypageRowListComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'

export const MyPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  return (
    <IonPage>
      <Header>
        <div slot='start'>
          <Icon name='setting' />
        </div>
        <TextXl className='text-bold ml-1'>나의 하마</TextXl>
      </Header>

      <IonContent>
        <div className='px-container my-4'>
          <MypageProfile />
          <Pad className='height-20' />
          <MypageRowList />
          <Pad className='height-20' />
          <MypageColumnList />
        </div>
      </IonContent>
    </IonPage>
  )
}
