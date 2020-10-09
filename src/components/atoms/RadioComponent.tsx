import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { IRadioItem } from '../../models/radio'

export interface IRadio {
  items: IRadioItem[]
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export const Radio: FC<IRadio> = ({ items, selected, setSelected }) => {
  return useObserver(() => (
    <IonRadioGroup className='flex' value={selected} onIonChange={(e) => setSelected(e.detail.value)}>
      {items.map((v, i) => (
        <IonItem key={i}>
          <IonLabel>{v.label}</IonLabel>
          <IonRadio slot='start' value={v.value} />
        </IonItem>
      ))}
    </IonRadioGroup>
  ))
}
