import { IonSpinner } from '@ionic/react'
import { FC } from 'react'

export type ISpinnerPosition = 'none' | 'center' | 'centerX' | 'centerY'

const positionClass: { [name in ISpinnerPosition]: string } = {
  none: '',
  center: 'absolute-center',
  centerX: 'absolute-horizontal-center',
  centerY: 'absolute-vertical-center',
}
export interface ISpinnerComponent {
  position?: ISpinnerPosition
  color?: string
}

export const Spinner: FC<ISpinnerComponent> = ({ position = 'none', color = 'dark' }) => {
  return (
    <div className={positionClass[position]}>
      <IonSpinner name='crescent' color={color} />
    </div>
  )
}
