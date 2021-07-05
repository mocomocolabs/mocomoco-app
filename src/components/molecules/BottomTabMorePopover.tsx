import { IonPopover } from '@ionic/react'
import { Dispatch, FC, SetStateAction } from 'react'
import { IMoreTabName } from '../../RouterTab'
import { route } from '../../services/route-service'
import { TextBase } from '../atoms/TextBaseComponent'
import './BottomTabMorePopover.scss'

export interface IBottomTabMorePopover {
  isOpen: boolean
  activeTab: IMoreTabName
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const BottomTabMorePopover: FC<IBottomTabMorePopover> = ({ isOpen, setIsOpen, activeTab }) => {
  return (
    <IonPopover
      cssClass='bottom-tab-more-popover'
      isOpen={isOpen}
      showBackdrop={false}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onDidDismiss={(e: any) => setIsOpen(e)}
    >
      <ul className='p-4'>
        <li
          className='text-center pv-2'
          onClick={() => {
            route.stuff()
            setIsOpen(false)
          }}
        >
          <TextBase className={`text-bold ${activeTab === 'stuff' && 'primary'}`}>물건창고</TextBase>
        </li>
        <li
          className='text-center pv-2'
          onClick={() => {
            route.talent()
            setIsOpen(false)
          }}
        >
          <TextBase className={`text-bold ${activeTab === 'talent' && 'primary'}`}>재능창고</TextBase>
        </li>
        <li
          className='text-center pv-2'
          onClick={() => {
            route.clubs()
            setIsOpen(false)
          }}
        >
          <TextBase className={`text-bold ${activeTab === 'club' && 'primary'}`}>소모임</TextBase>
        </li>
      </ul>
    </IonPopover>
  )
}
