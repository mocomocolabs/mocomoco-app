import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { getLabel, statusLabels, typeLabels } from '../../models/stufftalent'
import { IStuffTalent, StuffTalentStatus, StuffTalentType } from '../../models/stufftalent.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { Description } from '../atoms/DescriptionComponent'
import { Pad } from '../atoms/PadComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SquareWithCorner } from '../atoms/SquareWithCornerComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { ImageSlider } from './ImageSliderComponent'
import { MorePopoverButton } from './MorePopoverButtonComponent'

export interface IStuffTalentDetailContents {
  item: IStuffTalent
  loginUserId: number
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const StuffTalentDetailContents: FC<IStuffTalentDetailContents> = ({
  item,
  loginUserId,
  onEdit,
  onDelete,
}) => {
  const { $ui } = useStore()

  return (
    <div>
      <div className='relative'>
        <div
          hidden={item.status === StuffTalentStatus.AVAILABLE}
          className='flex-center w-full absolute z-20 text-bold text-base white'
          style={{ height: 337 }}
        >
          {getLabel(statusLabels, item.status)}
        </div>
        <div className='relative z-10'>
          <ImageSlider urls={item.imageUrls} dark={item.status !== StuffTalentStatus.AVAILABLE}></ImageSlider>
        </div>
      </div>
      <div className='px-container relative z-20' style={{ marginTop: '-20px' }}>
        <div className='flex items-center'>
          <SquareWithCorner
            width={55}
            height={24}
            color={item.type === StuffTalentType.WANT ? 'primary' : 'secondary'}
            fill={true}
          >
            {getLabel(typeLabels, item.type)}
          </SquareWithCorner>
          <TextBase className='text-bold ml-2'>{item.title}</TextBase>
        </div>
        <Pad className='h-2' />
        <div className='flex items-center gap-1'>
          {item.isExchangeable && (
            <SquareWithCorner width={55} height={24}>
              교환 가능
            </SquareWithCorner>
          )}
          {item.isNegotiable && (
            <SquareWithCorner width={55} height={24}>
              가격제안 가능
            </SquareWithCorner>
          )}
          <SquareWithCorner width={55} height={24}>
            {item.category.name}
          </SquareWithCorner>
        </div>

        <div
          className='flex items-center mt-1'
          hidden={[StuffTalentType.SHARE, StuffTalentType.WANT].includes(item.type)}
        >
          <TextBase className='text-bold'>
            {item.type === StuffTalentType.SELL ? item.price.toLocaleString() + '원' : item.exchangeText}
          </TextBase>
        </div>

        <XDivider className='mt-4 mb-6'></XDivider>

        <div className='flex-between-center'>
          <div
            className='flex items-center'
            onClick={() => {
              route.profileDetail(item.user.id)
            }}
          >
            <ProfileImage url={item.user.profileUrl} className='mr-2 w-10 h-10'></ProfileImage>
            <div className='flex-col'>
              <TextBase>{item.user.nickname}</TextBase>

              <TextSm className='gray'>
                {/* TODO community name 표시부분 공통화하기 */}
                {item.user.communities.map((community) => community.name).join('/')} /{' '}
                {timeDiff(item.createdAt)}
              </TextSm>
            </div>
          </div>

          {loginUserId === item.user.id && (
            <MorePopoverButton
              items={[
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
              ]}
            />
          )}
        </div>

        <Pad className='mt-4' />
        <Description>{item.content}</Description>
      </div>
    </div>
  )
}
