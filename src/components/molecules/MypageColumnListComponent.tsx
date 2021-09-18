import { MypageColumnItem } from './MypageColumnItemComponent'

export const MypageColumnList: React.FC = () => {
  return (
    <div className='flex-col ml-1'>
      <MypageColumnItem icon='invite' title='초대' href='' disabled />
      <MypageColumnItem icon='guide' title='하마 가이드' href='' disabled />
      <MypageColumnItem icon='search' title='자주 묻는 질문' href='' disabled />
      <MypageColumnItem icon='notice' title='공지사항' href='' disabled />
      <MypageColumnItem icon='setting' title='설정' href='/tabs/my-page/settings' />
    </div>
  )
}
