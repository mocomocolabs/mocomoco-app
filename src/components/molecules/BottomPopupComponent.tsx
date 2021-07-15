import { IonBackdrop } from '@ionic/react'
import { TextSm } from '../atoms/TextSmComponent'
import './BottomPopupComponent.scss'

interface IBottomPopup {
  show: boolean
  title?: string
  onClose: () => void
}

export const BottomPopup: React.FC<IBottomPopup> = ({ children, show, title, onClose }) => (
  <div hidden={!show} className='bottom-popup px-container mt-2 pt-4'>
    <div className='relative z-10 min-h-0 max-h-90% h-full'>
      {title && <TextSm className='text-bold text-center'>{title}</TextSm>}
      <div className='overflow-y-auto h-full my-4'>{children}</div>
    </div>
    <IonBackdrop onIonBackdropTap={onClose} />
  </div>
)
