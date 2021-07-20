import { IonPopover } from '@ionic/react'
import { FC } from 'react'
import { TAB_PATH } from '../../RouterTab'
import { route } from '../../services/route-service'
import { TextBase } from '../atoms/TextBaseComponent'
import './BottomTabMorePopover.scss'

export interface IBottomTabMorePopover {
  isOpen: boolean
  activeTab: TAB_PATH
  setIsOpen: (open: boolean) => void
}

export const BottomTabMorePopover: FC<IBottomTabMorePopover> = ({ isOpen, setIsOpen, activeTab }) => {
  return (
    <IonPopover
      cssClass='bottom-tab-more-popover'
      isOpen={isOpen}
      showBackdrop={false}
      onWillDismiss={() => setIsOpen(false)}
    >
      <div className='flex-col height-140 justify-center gap-4'>
        <div
          className='text-center'
          onClick={() => {
            route.stuff()
            setIsOpen(false)
          }}
        >
          <TextBase className={`text-bold ${activeTab === TAB_PATH.STUFF && 'primary'}`}>물건창고</TextBase>
        </div>
        <div
          className='text-center'
          onClick={() => {
            route.talent()
            setIsOpen(false)
          }}
        >
          <TextBase className={`text-bold ${activeTab === TAB_PATH.TALENT && 'primary'}`}>재능창고</TextBase>
        </div>
        <div
          className='text-center'
          onClick={() => {
            route.clubs()
            setIsOpen(false)
          }}
        >
          <TextBase className={`text-bold ${activeTab === TAB_PATH.CLUB && 'primary'}`}>소모임</TextBase>
        </div>
      </div>
    </IonPopover>
  )
}
