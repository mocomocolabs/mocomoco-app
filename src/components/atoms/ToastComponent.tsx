import { IonToast } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'

export const Toast: FC = () => {
  const { $ui } = useStore()

  return useObserver(() => (
    <IonToast
      isOpen={$ui.toast.isOpen}
      color={$ui.toast.color}
      message={$ui.toast.message}
      duration={3000}
    ></IonToast>
  ))
}
