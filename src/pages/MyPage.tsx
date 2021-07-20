import { IonButton, IonButtons, IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { Icon } from '../components/atoms/IconComponent'
import { TextLg } from '../components/atoms/TextLgComponent'
import { XDivider } from '../components/atoms/XDividerComponent'
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
        <>
          <IonButtons slot='start'>
            <IonButton slot='end' color='dark' routerLink='/tabs/my-page/settings'>
              <Icon name='setting' />
            </IonButton>
            <TextLg className='text-left text-bold'>나의 하마</TextLg>
          </IonButtons>
        </>
      </Header>

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
