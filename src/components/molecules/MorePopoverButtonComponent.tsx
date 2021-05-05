import { IonItem, IonList, useIonPopover } from '@ionic/react'
import React from 'react'

export interface IMorePopoverButton {
  items: { label: string; onClick: () => void }[]
}

export const MorePopoverButton: React.FC<IMorePopoverButton> = ({ items }) => {
  const [present, dismiss] = useIonPopover(
    <IonList>
      {items.map((v, i) => (
        <IonItem
          button
          lines='none'
          key={i}
          onClick={() => {
            dismiss()
            v.onClick()
          }}
        >
          {v.label}
        </IonItem>
      ))}
    </IonList>
  )
  return (
    <img
      src='/assets/icon/info.svg'
      onClick={(e) =>
        present({
          event: e.nativeEvent,
        })
      }
      alt=''
    />
  )
}
