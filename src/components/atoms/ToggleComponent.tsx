import { IonToggle } from '@ionic/react'
import React, { FC } from 'react'

export interface IToggle {
  checked?: boolean
  onChange?: (v: boolean) => void
}

export const Toggle: FC<IToggle> = ({ checked, onChange }) => {
  return <IonToggle checked={checked} onIonChange={(e) => onChange && onChange(e.detail.checked)}></IonToggle>
}
