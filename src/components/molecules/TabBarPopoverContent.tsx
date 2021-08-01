import { FC } from 'react'
import { TAB_PATH } from '../../RouterTab'
import { route } from '../../services/route-service'
import { TextBase } from '../atoms/TextBaseComponent'

interface ITabBarPopoverContents {
  activeTab: TAB_PATH
  hidePopover: () => void
}

export const TabBarPopoverContents: FC<ITabBarPopoverContents> = ({ activeTab, hidePopover }) => (
  <div className='flex-col height-140 justify-center gap-4'>
    <div
      className='text-center'
      onClick={() => {
        route.stuff()
        hidePopover()
      }}
    >
      <TextBase className={`text-bold ${activeTab === TAB_PATH.STUFF && 'primary'}`}>물건창고</TextBase>
    </div>
    <div
      className='text-center'
      onClick={() => {
        route.talent()
        hidePopover()
      }}
    >
      <TextBase className={`text-bold ${activeTab === TAB_PATH.TALENT && 'primary'}`}>재능창고</TextBase>
    </div>
    <div
      className='text-center'
      onClick={() => {
        route.clubs()
        hidePopover()
      }}
    >
      <TextBase className={`text-bold ${activeTab === TAB_PATH.CLUB && 'primary'}`}>소모임</TextBase>
    </div>
  </div>
)
