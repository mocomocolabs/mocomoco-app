import _ from 'lodash'
import { useStore } from '../../hooks/use-store'
import { getLabel, routeFunc, statusLabels, typeLabels } from '../../models/stufftalent'
import {
  IStuffTalent,
  StuffTalentPageKey,
  StuffTalentStatus,
  StuffTalentType,
} from '../../models/stufftalent.d'
import { timeDiff } from '../../utils/datetime-util'
import { Icon } from '../atoms/IconComponent'
import { SquareWithCorner } from '../atoms/SquareWithCornerComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { TextXs } from '../atoms/TextXsComponent'
import { ImageWithCorner } from './ImageWithCorner'
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
      <div className='flex br-xxlg shadow mb-4 pr-1'>
        <div className='flex' onClick={() => routeDetail(item.id)}>
          <div
            hidden={item.status === StuffTalentStatus.AVAILABLE}
            className='flex-center absolute z-20 text-bold text-sm white'
            style={{ width: 114, height: 124 }}
          >
            {getLabel(statusLabels, item.status)}
          </div>
          <ImageWithCorner
            height={124}
            width={138}
            url={item.imageUrls[0]}
            radiusSize={20}
            tailRight={true}
            dark={item.status !== StuffTalentStatus.AVAILABLE}
          ></ImageWithCorner>
        </div>

        <div className='flex-col flex-1 min-w-0 -ml-1 z-10 mr-1 py-2' onClick={() => routeDetail(item.id)}>
          <div className='flex justify-between items-center'>
            <div className='flex-none'>
              <SquareWithCorner
                color={item.type === StuffTalentType.WANT ? 'primary' : 'secondary'}
                fill={true}
              >
                {getLabel(typeLabels, item.type)}
              </SquareWithCorner>
            </div>
            <TextSm className='ellipsis min-w-0 ml-1 flex-grow'>{item.title}</TextSm>
            <div className='flex flex-none h-full ml-1' onClick={(e) => e.stopPropagation()}>
              {loginUserId === item.user.id && <MorePopoverButton items={popoverItems} />}
            </div>
          </div>
          <div className='flex-grow gray ellipsis pt-0_5 text-xxs'>
            {item.community.name} / {timeDiff(undefined, item.createdAt)}
          </div>
          <div className='inline-flex' style={{ gap: '0 0.2rem' }}>
            {item.isExchangeable && <SquareWithCorner>교환 가능</SquareWithCorner>}
            {item.isNegotiable && <SquareWithCorner>가격제안 가능</SquareWithCorner>}
          </div>
          <div className='flex justify-between self-bottom mt-1'>
            <TextSm className='text-bold ellipsis'>
              {item.type === StuffTalentType.SELL && `${item.price}원`}
              {item.type === StuffTalentType.EXCHANGE && item.exchangeText}
              {item.type === StuffTalentType.SHARE && '무료나눔'}
            </TextSm>
            <div className='flex-center self-end ml-1'>
              <Icon
                name={item.isLike ? 'heart-solid' : 'heart'}
                className='icon-secondary mr-1'
                small={true}
              />
              <TextXs className='secondary'>{item.likeCount}</TextXs>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
