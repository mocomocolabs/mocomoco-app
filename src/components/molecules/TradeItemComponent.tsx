import { IonIcon } from '@ionic/react'
import { chatbox, cloud } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { IStuff } from '../../models/stuff'
import { ITalent } from '../../models/talent'
import { route } from '../../services/route-service'
import { Stuff } from '../../stores/stuff-store'
import { Talent } from '../../stores/talent-store'
import { timeDiff } from '../../utils/datetime-util'
import { OverflowMenuIcon } from '../atoms/OverflowMenuIconComponent'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
interface ITradeItem {
  store: Stuff | Talent
  item: IStuff | ITalent
  onDelete: (id: number) => void
}

const TypeString = {
  GIVE: '팔아요',
  TAKE: '구해요',
}

const StatusString = {
  AVAILABLE: '판매중',
  RESERVED: '예약중',
  FINISH: '거래완료',
}

export const TradeItem: React.FC<ITradeItem> = ({ store, item, onDelete }) => {
  const { $user } = useStore()

  // TODO dont use store. Instead, use another flag
  const routeDetail = (store as Stuff) ? route.stuffDetail : route.talentDetail

  const getItemLikeCount = (item: IStuff | ITalent) => {
    if ((item as IStuff).stuffUsers) return (item as IStuff).stuffUsers.length ?? 0

    if ((item as ITalent).talentUsers) return (item as ITalent).talentUsers.length ?? 0

    return 0
  }

  return useObserver(() => (
    <li className='py-4'>
      <div className='flex'>
        <div className='flex-between-center w-full' onClick={() => routeDetail(item.id)}>
          <img className='w-20 h-20 mr-2' src={item.atchFiles[0].url} alt={item.title} />

          <div className='flex-col flex-1'>
            <TextBase>
              [{StatusString[item.status]}] {item.title}
            </TextBase>
            <TextBase>{item.user.community}</TextBase>
            <TextBase>
              [{TypeString[item.type]}] {item.price}원
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
            show={$user.currentUserId === item.user.id}
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
  ))
}
