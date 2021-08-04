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
      <Header>
        <div slot='start' className='flex-1 flex-none items-center'>
          <Icon name='close' onClick={() => $ui.hideModal()} />
        </div>
        <div className='flex-grow text-header absolute-center'>{$ui.modal.title}</div>
      </Header>
      <IonContent>{$ui.modal.children}</IonContent>
    </IonModal>
  ))
}
