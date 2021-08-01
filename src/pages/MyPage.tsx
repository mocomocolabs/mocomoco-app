import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { Pad } from '../components/atoms/PadComponent'
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
        <div className='text-header'>나의 하마</div>
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
