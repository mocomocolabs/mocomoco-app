import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { IStuffTalent, StuffTalentType } from '../../models/stufftalent.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { Description } from '../atoms/DescriptionComponent'
import { Pad } from '../atoms/PadComponent'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
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
      <ImageSlider urls={item.imageUrls}></ImageSlider>
      <div className='px-container pt-2'>
        <div className='flex items-center'>
          <TextLg className='mr-2'>{item.type}</TextLg>
          <TextLg className='text-bold'>{item.title}</TextLg>
        </div>

        <div className='flex items-center mt-1'>
          <TextSm>{item.isExchangeable && '교환 가능'}</TextSm>
          <TextSm>{item.isNegotiable && '가격제안 가능'}</TextSm>
          <TextSm>{item.category.name}</TextSm>
        </div>

        <div
          className='flex items-center mt-1'
          hidden={[StuffTalentType.SHARE, StuffTalentType.WANT].includes(item.type)}
        >
          <TextBase>{item.type === StuffTalentType.SELL ? item.price + '원' : item.exchangeText}</TextBase>
        </div>

        <XDivider className='mt-4 mb-6'></XDivider>

        <div className='flex-between-center'>
          <div
            className='flex items-center'
            onClick={() => {
              route.profileDetail(item.user.id)
            }}
          >
            <Profile url={item.user.profileUrl} className='mr-2 w-10 h-10'></Profile>
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
