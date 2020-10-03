import { IonPopover } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'

export interface IContentPopover {}

export const ContentPopover: FC<IContentPopover> = () => {
  const { $ui } = useStore()

  return useObserver(() => (
    <IonPopover isOpen={$ui.popover.isOpen} event={$ui.popover.event} onDidDismiss={() => $ui.hidePopover()}>
      <ul className='p-4'>
        <li
          className='p-2'
          onClick={() => {
            $ui.hidePopover('EDIT')
          }}
        >
          수정
        </li>
        <li
          className='p-2'
          onClick={() => {
            $ui.hidePopover('DELETE')
          }}
        >
          삭제
        </li>
      </ul>
    </IonPopover>
  ))
}
