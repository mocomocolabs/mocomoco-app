import { IonButton, IonIcon } from '@ionic/react'
import { TextXxl } from '../atoms/TextXxlComponent'

interface IMypageRowItem {
  icon: string
  title: string
  onClick?: () => void
}

export const MypageRowItem: React.FC<IMypageRowItem> = ({ icon, title, onClick }) => {
  return (
    <IonButton color='dark' fill='outline' onClick={onClick}>
      <div className='flex items-center'>
        <IonIcon icon={icon} size='large' />
        <TextXxl>{title}</TextXxl>
      </div>
    </IonButton>
  )
}
