import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'

export const DevPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  return (
    <IonPage>
      <Header center='Dev' />

      <IonContent />
    </IonPage>
  )
}
