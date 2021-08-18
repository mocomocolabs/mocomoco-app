import { IonContent, IonModal } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { Header } from '../organisms/HeaderComponent'

export const Modal: FC = () => {
  const { $ui } = useStore()

  return useObserver(() => (
    <IonModal isOpen={$ui.modal.isOpen}>
      <Header start={<Icon name='close' onClick={() => $ui.hideModal()} />} center={$ui.modal.title} />
      <IonContent>{$ui.modal.children}</IonContent>
    </IonModal>
  ))
}
