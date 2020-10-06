import { IonIcon } from '@ionic/react'
import { chatbox, cloud, ellipsisVertical } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../hooks/use-store'
import { IStuff } from '../../models/stuff'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'

interface IStuffItem {
  stuff: IStuff
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

export const StuffItem: React.FC<IStuffItem> = ({ stuff, isDetail = false }) => {
  const history = useHistory()
  const { $ui, $user, $stuff } = useStore()

  return useObserver(() => (
    <li className='py-4'>
      <div className='flex'>
        <div
          className='flex-between-center w-full'
          slot='start'
          onClick={() => !isDetail && history.push(`/trade/stuff/${stuff.id}`)}
        >
          <div className='flex justify-start w-20 h-20 mr-2' slot='start'>
            <img className='max-width' src={stuff.imageUrls[0]} alt={stuff.title} />
          </div>
          <div className='flex-1 items-start'>
            <div className='flex-col items-start'>
              <TextBase>
                [{StatusString[stuff.status]}] {stuff.title}
              </TextBase>
              <TextBase>{stuff.user.community}</TextBase>
              <TextBase>
                [{TypeString[stuff.type]}] {stuff.price}원
              </TextBase>
            </div>
          </div>
        </div>

        <div className='flex-col items-end w-25' slot='end'>
          <div className='flex items-center' onClick={() => history.push(`/users/${stuff.user.id}`)}>
            <Profile url={stuff.user.profileUrl}></Profile>
            <TextBase className='ml-1'>{stuff.user.nickname}</TextBase>
          </div>

          <div className='flex'>
            <IonIcon icon={cloud} className='mr-1'></IonIcon>
            <TextBase className='dim mr-1'>{stuff.likeCount}</TextBase>
            <IonIcon icon={chatbox} className='mr-1'></IonIcon>
            <TextBase className='dim'>{stuff.chatCount}</TextBase>
          </div>
          <TextBase className='dim'>{stuff.createdAt}</TextBase>
        </div>

        <div className='flex-end w-2' slot='end'>
          {$user.currentUserId === stuff.user.id && (
            <IonIcon
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
                        await $stuff.deleteStuff(stuff.id)
                        await $stuff.getStuffs()
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
          )}
        </div>
      </div>

      <div className='flex-col'>
        {isDetail && (
          <div className='flex flex-wrap items-center'>
            <TextLg className='gray w-12'>씨앗들</TextLg>
            {stuff.likeProflieUrls?.slice(0, 9).map((v, i) => (
              <Profile key={i} url={v}></Profile>
            ))}
          </div>
        )}
      </div>
    </li>
  ))
}
