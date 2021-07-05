import { IonIcon } from '@ionic/react'
import { chatbox, cloud } from 'ionicons/icons'
import _ from 'lodash'
import { useStore } from '../../hooks/use-store'
import { getLabel, routeFunc, statusLabels, typeLabels } from '../../models/stufftalent'
import { IStuffTalent, StuffTalentPageKey, StuffTalentStatus } from '../../models/stufftalent.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { MorePopoverButton } from './MorePopoverButtonComponent'

interface IStuffTalentIItem {
  loginUserId: number
  pageKey: StuffTalentPageKey
  item: IStuffTalent
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onUpdateStatus?: (id: number, status: StuffTalentStatus) => void
}

export const StuffTalentItem: React.FC<IStuffTalentIItem> = ({
  loginUserId,
  pageKey,
  item,
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  const { $ui } = useStore()

  const { routeDetail } = routeFunc[pageKey]

  const [popoverEdit, popoverDelete, popoverFinish, popoverAvailable, popoverReserved] = [
    {
      label: '수정',
      onClick: () => onEdit && onEdit(item.id),
    },
    {
      label: '삭제',
      onClick: () => {
        $ui.showAlert({
          isOpen: true,
          message: '게시글을 삭제하시겠어요?',
          onSuccess: () => onDelete && onDelete(item.id),
        })
      },
    },
    {
      label: '거래완료로 변경',
      onClick: () => onUpdateStatus && onUpdateStatus(item.id, StuffTalentStatus.FINISH),
    },
    {
      label: '판매중으로 변경',
      onClick: () => onUpdateStatus && onUpdateStatus(item.id, StuffTalentStatus.AVAILABLE),
    },
    {
      label: '예약중으로 변경',
      onClick: () => onUpdateStatus && onUpdateStatus(item.id, StuffTalentStatus.RESERVED),
    },
  ]

  const popoverItems = _.concat(
    [popoverEdit, popoverDelete],
    item.status !== StuffTalentStatus.FINISH && popoverFinish,
    item.status !== StuffTalentStatus.AVAILABLE && popoverAvailable,
    item.status !== StuffTalentStatus.RESERVED && popoverReserved
  ).filter(Boolean) as { label: string; onClick: () => void }[]

  return (
    <li>
      <div className='flex'>
        <div className='flex-between-center w-full' onClick={() => routeDetail(item.id)}>
          <img className='w-20 h-20 mr-2' src={item.atchFiles[0].url} alt={item.title} />

          <div className='flex-col flex-1'>
            <TextBase>
              [{getLabel(statusLabels, item.status)}] {item.title}
            </TextBase>
            <TextBase>{item.user.communities.map((community) => community.name).join('/')}</TextBase>
            <TextBase>
              [{getLabel(typeLabels, item.type)}] {item.price}원
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
            <TextBase className='dim mr-1'>{item.likeCount}</TextBase>
            <IonIcon icon={chatbox} className='mr-1'></IonIcon>
            {/* <TextBase className='dim'>{item.chatCount}</TextBase> */}
          </div>

          <TextBase className='dim'>{timeDiff(undefined, item.createdAt)}</TextBase>
        </div>

        <div className='flex justify-end w-4'>
          {loginUserId === item.user.id && <MorePopoverButton items={popoverItems} />}
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
