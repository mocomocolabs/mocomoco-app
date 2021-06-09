import { IonIcon } from '@ionic/react'
import { chatbox, cloud } from 'ionicons/icons'
import {
  IStuffTalent,
  StuffTalentPathName as Path,
  StuffTalentStatus as Status,
  StuffTalentType as Type,
} from '../../models/stufftalent.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { OverflowMenuIcon } from '../atoms/OverflowMenuIconComponent'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'

interface IStuffTalentIItem {
  loginUserId: number
  path: Path
  item: IStuffTalent
  onDelete: (id: number) => void
}

const TypeLabel = {
  [Type.GIVE]: '팔아요',
  [Type.TAKE]: '구해요',
}

const StatusLabel = {
  [Status.AVAILABLE]: '판매중',
  [Status.RESERVED]: '예약중',
  [Status.FINISH]: '거래완료',
}

export const StuffTalentItem: React.FC<IStuffTalentIItem> = ({ loginUserId, path, item, onDelete }) => {
  const routeDetail = path === Path.STUFF ? route.stuffDetail : route.talentDetail

  const getItemLikeCount = (item: IStuffTalent) => {
    return item.stuffUsers ? item.stuffUsers.length : item.talentUsers.length
  }

  return (
    <li className='py-4'>
      <div className='flex'>
        <div className='flex-between-center w-full' onClick={() => routeDetail(item.id)}>
          <img className='w-20 h-20 mr-2' src={item.atchFiles[0].url} alt={item.title} />

          <div className='flex-col flex-1'>
            <TextBase>
              [{StatusLabel[item.status]}] {item.title}
            </TextBase>
            <TextBase>{item.user.communities.map((community) => community.name).join('/')}</TextBase>
            <TextBase>
              [{TypeLabel[item.type]}] {item.price}원
            </TextBase>
          </div>
        </div>

        <div className='flex-col items-end w-25'>
          <div className='flex items-center' onClick={() => route.profileDetail(item.user.id)}>
            <Profile url={item.user.profileUrl}></Profile>
            <TextBase className='ml-1'>{item.user.nickname}</TextBase>
          </div>

          <div className='flex'>
            <IonIcon icon={cloud} className='mr-1'></IonIcon>
            <TextBase className='dim mr-1'>{getItemLikeCount(item)}</TextBase>
            <IonIcon icon={chatbox} className='mr-1'></IonIcon>
            {/* <TextBase className='dim'>{item.chatCount}</TextBase> */}
          </div>

          <TextBase className='dim'>{timeDiff(undefined, item.createdAt)}</TextBase>
        </div>

        <div className='flex justify-end w-4'>
          <OverflowMenuIcon
            className='self-top'
            show={loginUserId === item.user.id}
            onDelete={() => onDelete(item.id)}
          />
        </div>
      </div>

      <div className='flex-col'>
        <div className='flex flex-wrap items-center'>
          <TextLg className='gray w-12'>씨앗들</TextLg>
        </div>
      </div>
    </li>
  )
}
