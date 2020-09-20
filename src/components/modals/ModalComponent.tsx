import { IonModal, IonHeader, IonToolbar, IonIcon, IonContent } from '@ionic/react'
import { close } from 'ionicons/icons'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { TextLg } from '../atoms/TextLgComponent'

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
            <IonIcon icon={close} onClick={() => setIsShow(false)}></IonIcon>{' '}
            <TextLg className='ml-2'>{title}</TextLg>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </>
  </IonModal>
)
