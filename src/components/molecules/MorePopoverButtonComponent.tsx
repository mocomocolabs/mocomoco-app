import { IonItem, IonList } from '@ionic/react'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { TextBase } from '../atoms/TextBaseComponent'

export interface IMorePopoverButton {
  items: { label: string; onClick: () => void }[]
}

export const MorePopoverButton: React.FC<IMorePopoverButton> = ({ items }) => {
  const { $ui } = useStore()

  return (
    <img
      src='/assets/icon/info.svg'
      onClick={(e) =>
        $ui.showPopover({
          event: e.nativeEvent,
          animated: false,
          showBackdrop: true,
          children: (
            <IonList>
              {items.map((v, i) => (
                <IonItem
                  button
                  lines='none'
                  key={i}
                  onClick={() => {
                    $ui.hidePopover()
                    v.onClick()
                  }}
                >
                  <TextBase>{v.label}</TextBase>
                </IonItem>
              ))}
            </IonList>
          ),
        })
      }
      alt=''
    />
  )
}
