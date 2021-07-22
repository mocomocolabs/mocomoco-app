import { route } from '../../services/route-service'
import { YDivider } from '../atoms/YDividerComponent'
import { MypageRowItem } from './MypageRowItemComponent'

export const MypageRowList: React.FC = () => {
  return (
    <div className='flex-between-center br-xlg shadow height-88'>
      <div className='flex-center flex-grow'>
        <MypageRowItem icon='document-solid' title='내 목록' onClick={() => route.myPageMyList()} />
      </div>
      <YDivider className='flex-center height-56 hr-gray' />
      <div className='flex-center flex-grow'>
        <MypageRowItem icon='heart-solid' title='관심 목록' onClick={() => route.myPageLikeList()} />
      </div>
    </div>
  )
}
