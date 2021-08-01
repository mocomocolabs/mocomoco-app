import { IonPopover } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'

export const Popover: FC = () => {
  const { $ui } = useStore()

  return useObserver(() => (
    <IonPopover
      isOpen={$ui.popover.isOpen}
      cssClass={$ui.popover.cssClass}
      event={$ui.popover.event}
      animated={$ui.popover.animated}
      showBackdrop={$ui.popover.showBackdrop}
      onDidDismiss={() => $ui.hidePopover()}
    >
      {$ui.popover.children}
    </IonPopover>
  ))
}
