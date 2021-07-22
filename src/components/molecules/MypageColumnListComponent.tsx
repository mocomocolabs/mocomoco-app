import { MypageColumnItem } from './MypageColumnItemComponent'

export const MypageColumnList: React.FC = () => {
  return (
    <div className='flex-col ml-1'>
      <MypageColumnItem icon='invite' title='초대' href='' />
      <MypageColumnItem icon='guide' title='구름씨가이드' href='' />
      <MypageColumnItem icon='search' title='자주 묻는 질문' href='' />
      <MypageColumnItem icon='notice' title='공지사항' href='' />
      <MypageColumnItem icon='setting' title='설정' href='/tabs/my-page/settings' />
    </div>
  )
}
