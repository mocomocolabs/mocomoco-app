import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { IRadioItem } from '../../models/radio'

export interface IRadio {
  items: IRadioItem[]
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export const Radio: FC<IRadio> = ({ items, selected, setSelected }) => {
  return useObserver(() => (
    // TODO radio button 디자인 입히기
    <IonRadioGroup className='flex' value={selected} onIonChange={(e) => setSelected(e.detail.value)}>
      {items.map((v, i) => (
        <IonItem className='text-xs' key={i}>
          <IonLabel>{v.label}</IonLabel>
          <IonRadio className='m-0' slot='start' value={v.value} />
        </IonItem>
      ))}
    </IonRadioGroup>
  ))
}
