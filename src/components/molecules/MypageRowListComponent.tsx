import { basketOutline, beerOutline, heartOutline } from 'ionicons/icons'
import React from 'react'
import { MypageRowItem } from './MypageRowItemComponent'

export const MypageRowList: React.FC = () => {
  return (
    <div className='flex-row justify-around items-center height-100'>
      <MypageRowItem icon={basketOutline} title='내 물품/재능' />
      <MypageRowItem icon={heartOutline} title='관심 물품/재능' />
      <MypageRowItem icon={beerOutline} title='커뮤니티' />
    </div>
  )
}
