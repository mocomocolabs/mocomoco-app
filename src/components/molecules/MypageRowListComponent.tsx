import { basketOutline, heartOutline } from 'ionicons/icons'
import { route } from '../../services/route-service'
import { MypageRowItem } from './MypageRowItemComponent'

export const MypageRowList: React.FC = () => {
  return (
    <div className='flex-row justify-around items-center height-50'>
      <MypageRowItem icon={basketOutline} title='내 목록' onClick={() => route.myPageMyList()} />
      <MypageRowItem icon={heartOutline} title='관심 목록' onClick={() => route.myPageLikeList()} />
    </div>
  )
}
