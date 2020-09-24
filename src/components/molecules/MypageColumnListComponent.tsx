import {
  cloudDoneOutline,
  cloudOutline,
  cloudUploadOutline,
  mailOutline,
  settingsOutline,
} from 'ionicons/icons'
import React from 'react'
import { MypageColumnItem } from './MypageColumnItemComponent'

export const MypageColumnList: React.FC = () => {
  return (
    <div className='flex-col'>
      <MypageColumnItem icon={mailOutline} title='초대' href='' />
      <MypageColumnItem icon={cloudOutline} title='구름씨가이드' href='' />
      <MypageColumnItem icon={cloudUploadOutline} title='자주 묻는 질문' href='' />
      <MypageColumnItem icon={cloudDoneOutline} title='공지사항' href='' />
      <MypageColumnItem icon={settingsOutline} title='설정' href='/settings' />
    </div>
  )
}
