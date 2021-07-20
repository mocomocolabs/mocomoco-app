import { IonContent, IonModal } from '@ionic/react'
import { Dispatch, FC, SetStateAction } from 'react'
import { Icon } from '../atoms/IconComponent'
import { Header } from '../organisms/HeaderComponent'

export interface ModalProps {
  title: string
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  children?: React.ReactNode
}

export const Modal: FC<ModalProps> = ({ isShow, setIsShow, title, children }) => (
  <IonModal isOpen={isShow}>
    <Header>
      <div slot='start' className='flex-1 flex-none items-center'>
        <Icon name='close' onClick={() => setIsShow(false)}></Icon>
      </div>
      <div className='flex-center flex-grow text-header text-center'>{title}</div>
      <div slot='end' className='flex-none w-4'></div>
    </Header>
    <IonContent>{children}</IonContent>
  </IonModal>
)
