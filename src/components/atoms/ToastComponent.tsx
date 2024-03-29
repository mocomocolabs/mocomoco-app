import { IonToast } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import './ToastComponent.scss'

export const Toast: FC = () => {
  const { $ui } = useStore()

  return useObserver(() => (
    <IonToast
      isOpen={$ui.toast.isOpen}
      color={$ui.toast.color}
      message={$ui.toast.message}
      position='bottom'
      cssClass='bottom-toast'
    />
  ))
}
