import _ from 'lodash'
import { FC, useMemo } from 'react'
import { useStore } from '../../hooks/use-store'
import { getLabel, statusLabels, typeLabels } from '../../models/stufftalent'
import { IStuffTalent, StuffTalentStatus, StuffTalentType } from '../../models/stufftalent.d'
import { timeDiff } from '../../utils/datetime-util'
import { Description } from '../atoms/DescriptionComponent'
import { Pad } from '../atoms/PadComponent'
import { SquareWithCorner } from '../atoms/SquareWithCornerComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { TextXxl } from '../atoms/TextXxlComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { ImageSlider } from './ImageSliderComponent'
import { MorePopoverButton } from './MorePopoverButtonComponent'
import { ProfileCard } from './ProfileCardComponent'

export interface IStuffTalentDetailContents {
  item: IStuffTalent
  loginUserId: number
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: StuffTalentStatus) => void
}

export const StuffTalentDetailContents: FC<IStuffTalentDetailContents> = ({
  item,
  loginUserId,
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  const { $ui } = useStore()

  const [popoverEdit, popoverDelete, popoverFinish, popoverAvailable, popoverReserved] = [
    {
      label: '수정',
      onClick: () => onEdit(item.id),
    },
    {
      label: '삭제',
      onClick: () => {
        $ui.showAlert({
          isOpen: true,
          message: '게시글을 삭제하시겠어요?',
          onSuccess: () => onDelete(item.id),
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

  const popoverItems = useMemo(
    () =>
      _.concat(
        [popoverEdit, popoverDelete],
        item.status !== StuffTalentStatus.FINISH && popoverFinish,
        item.status !== StuffTalentStatus.AVAILABLE && popoverAvailable,
        item.status !== StuffTalentStatus.RESERVED && popoverReserved
      ).filter(Boolean) as { label: string; onClick: () => void }[],
    [item.status]
  )

  return (
    <div>
      <ImageSlider urls={item.imageUrls} />
      <Pad className='h-5' />
      <div className='px-container relative z-20' style={{ marginTop: '-20px' }}>
        <div className='flex items-center'>
          <SquareWithCorner
            width={55}
            height={24}
            color={item.type === StuffTalentType.WANT ? 'primary' : 'secondary'}
            fill={true}
          >
            <TextSm>{getLabel(typeLabels, item.type)}</TextSm>
          </SquareWithCorner>
          {item.status !== StuffTalentStatus.AVAILABLE && (
            <TextLg
              className={`text-bold ml-1 ${
                item.status === StuffTalentStatus.RESERVED ? 'secondary' : 'gray'
              }`}
            >
              {getLabel(statusLabels, item.status)}
            </TextLg>
          )}
          <TextLg className='text-bold ml-1'>{item.title}</TextLg>
        </div>
        <Pad className='h-2' />
        <div className='flex items-center gap-1'>
          {item.isExchangeable && (
            <SquareWithCorner width={55} height={24}>
              <TextSm>교환 가능</TextSm>
            </SquareWithCorner>
          )}
          {item.isNegotiable && (
            <SquareWithCorner width={55} height={24}>
              <TextSm>가격제안 가능</TextSm>
            </SquareWithCorner>
          )}
          <SquareWithCorner width={55} height={24}>
            <TextSm>{item.category.name}</TextSm>
          </SquareWithCorner>
        </div>

        <div
          className='flex items-baseline mt-1'
          hidden={[StuffTalentType.SHARE, StuffTalentType.WANT].includes(item.type)}
        >
          <TextXxl className='text-bold'>
            {item.type === StuffTalentType.SELL ? item.price.toLocaleString() : item.exchangeText}
          </TextXxl>
          {item.type === StuffTalentType.SELL && <TextBase>원</TextBase>}
        </div>

        <XDivider className='my-3'></XDivider>

        <div className='flex-between-center'>
          <ProfileCard
            userId={item.user.id}
            profileUrl={item.user.profileUrl}
            nickname={item.user.nickname}
            communityName={`${item.user.communities.map((community) => community.name).join('/')}`}
            extraText={timeDiff(item.createdAt)}
          />

          {loginUserId === item.user.id && <MorePopoverButton items={popoverItems} />}
        </div>

        <Pad className='mt-4' />
        <Description>{item.content}</Description>
      </div>
    </div>
  )
}
