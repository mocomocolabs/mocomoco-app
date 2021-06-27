import { IonContent, IonHeader, IonModal, IonToolbar } from '@ionic/react'
import { Dispatch, FC, SetStateAction } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextXl } from '../atoms/TextXlComponent'

export interface ModalProps {
  title: string
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  children?: React.ReactNode
}

export const Modal: FC<ModalProps> = ({ isShow, setIsShow, title, children }) => (
  <IonModal isOpen={isShow}>
    <>
      <IonHeader>
        <IonToolbar>
          <div slot='start' className='flex items-center'>
            <Icon name='close' onClick={() => setIsShow(false)}></Icon>
            <TextXl className='ml-2 text-bold'>{title}</TextXl>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </>
  </IonModal>
)
