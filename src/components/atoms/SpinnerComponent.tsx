import { IonSpinner } from '@ionic/react'
import { FC } from 'react'

type ISpinnerPosition = 'center' | 'centerX' | 'centerY'

const positionClass: { [name in ISpinnerPosition]: string } = {
  center: 'absolute-center',
  centerX: 'absolute-horizontal-center',
  centerY: 'absolute-vertical-center',
}
export interface ISpinnerComponent {
  position?: ISpinnerPosition
  color?: string
}

export const Spinner: FC<ISpinnerComponent> = ({ position, color = 'dark' }) => {
  return (
    <div className={position ? positionClass[position] : ''}>
      <IonSpinner name='crescent' color={color} />
    </div>
  )
}
