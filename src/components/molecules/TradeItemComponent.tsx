import { IonIcon } from '@ionic/react'
import { chatbox, cloud, ellipsisVertical } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../hooks/use-store'
import { ITrade } from '../../models/trade'
import { TradeStore } from '../../stores/trade-store'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
interface ITradeItem {
  store: TradeStore
  items: ITrade
  isDetail: boolean
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

export const TradeItem: React.FC<ITradeItem> = ({ store, items, isDetail = false }) => {
  const history = useHistory()
  const { $ui, $user } = useStore()

  return useObserver(() => (
    <li className='py-4'>
      <div className='flex'>
        <div
          className='flex-between-center w-full'
          onClick={() => !isDetail && history.push(`/trade/${store.path}/${items.id}`)}
        >
          <img className='w-20 h-20 mr-2' src={items.imageUrls[0]} alt={items.title} />

          <div className='flex-col flex-1'>
            <TextBase>
              [{StatusString[items.status]}] {items.title}
            </TextBase>
            <TextBase>{items.user.community}</TextBase>
            <TextBase>
              [{TypeString[items.type]}] {items.price}원
            </TextBase>
          </div>
        </div>

        <div className='flex-col items-end w-25'>
          <div className='flex items-center' onClick={() => history.push(`/users/${items.user.id}`)}>
            <Profile url={items.user.profileUrl}></Profile>
            <TextBase className='ml-1'>{items.user.nickname}</TextBase>
          </div>

          <div className='flex'>
            <IonIcon icon={cloud} className='mr-1'></IonIcon>
            <TextBase className='dim mr-1'>{items.likeCount}</TextBase>
            <IonIcon icon={chatbox} className='mr-1'></IonIcon>
            <TextBase className='dim'>{items.chatCount}</TextBase>
          </div>

          <TextBase className='dim'>{items.createdAt}</TextBase>
        </div>

        <div className='flex justify-end w-4'>
          {/* // TODO: extract component */}
          <IonIcon
            hidden={$user.currentUserId !== items.user.id}
            className='self-top'
            icon={ellipsisVertical}
            onClick={async (e) => {
              const action = await $ui.showPopover(e.nativeEvent)
              switch (action) {
                case 'DELETE':
                  $ui.showAlert({
                    isOpen: true,
                    message: '게시글을 삭제하시겠어요?',
                    onSuccess: async () => {
                      // TODO: 로더 추가
                      await store.deleteItem(items.id)
                      await store.getItems()
                      if (isDetail) {
                        history.goBack()
                      }
                    },
                  })
                  break
                case 'EDIT':
                  break
              }
            }}
          ></IonIcon>
        </div>
      </div>

      <div className='flex-col' hidden={!isDetail}>
        <div className='flex flex-wrap items-center'>
          <TextLg className='gray w-12'>씨앗들</TextLg>
          {items.likeProflieUrls?.slice(0, 9).map((v, i) => (
            <Profile key={i} url={v}></Profile>
          ))}
        </div>
      </div>
    </li>
  ))
}
