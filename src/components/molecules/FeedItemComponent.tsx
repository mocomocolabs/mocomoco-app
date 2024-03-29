import React, { FC, useCallback, useMemo, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { IFeed } from '../../models/feed.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { collapseTextByLine } from '../../utils/text-util'
import { Icon } from '../atoms/IconComponent'
import { Pad } from '../atoms/PadComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { CommentItem } from './CommentItemComponent'
import { ImageSlider } from './ImageSliderComponent'
import { MorePopoverButton } from './MorePopoverButtonComponent'
import { ProfileCard } from './ProfileCardComponent'

interface IFeedItem {
  feed: IFeed
  isDetail?: boolean
  onDelete: (feed: IFeed) => void
  onEdit: (id: number) => void
}

export const FeedItem: FC<IFeedItem> = ({ feed, isDetail = false, onDelete, onEdit }) => {
  // TODO: $auth를 parameter로 넘기던지 organisms로 승격
  const { $auth, $feed, $ui } = useStore()

  const popoverItems = useMemo(
    () => [
      {
        label: '수정',
        onClick: () => onEdit(feed.id),
      },
      {
        label: '삭제',
        onClick: () => {
          $ui.showAlert({
            message: '게시글을 삭제하시겠어요?',
            onSuccess: () => onDelete(feed),
          })
        },
      },
    ],
    []
  )

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDetail) {
      route.feedDetail(feed.id)
      e.stopPropagation()
    }
  }, [])

  const onClickWithAutoFocus = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDetail) {
      route.feedDetail(feed.id, { autoFocus: true })
      e.stopPropagation()
    }
  }, [])

  const [showMore, setShowMore] = useState<boolean>(false)

  const content = useMemo(() => {
    const content = feed.content

    if (isDetail) return content

    const collapsed = collapseTextByLine(content, 3)

    if (content == collapsed) return content

    setShowMore(true)
    return collapsed
  }, [feed.content])

  return (
    <li>
      {feed.imageUrls?.length > 0 ? (
        <div onClick={onClick}>
          <ImageSlider urls={feed.imageUrls}></ImageSlider>
        </div>
      ) : (
        <Pad className={isDetail ? 'h-15' : 'h-5'}></Pad>
      )}
      <div className='px-container flex-col ellipsis'>
        {feed.title && (
          <div onClick={onClick} className='text-bold text-xl mb-5'>
            {feed.title}
          </div>
        )}
        <div className='flex-between-center mb-5'>
          <ProfileCard
            userId={feed.user.id}
            profileUrl={feed.user.profileUrl}
            communityName={feed.user.communities[0]?.name}
            nickname={feed.user.nickname}
            extraText={timeDiff(feed.createdAt)}
          ></ProfileCard>

          {$auth.user.id === feed.user.id && <MorePopoverButton items={popoverItems} />}
        </div>

        <div className='text-base pre-line ellipsis' onClick={onClick}>
          {content}
          <div hidden={!showMore} className='text-sm text-bold gray'>
            ...더보기
          </div>
        </div>

        {feed.schedule && (
          <div className='br-lg shadow p-3 mt-5' onClick={onClick}>
            <div className='flex items-center'>
              <Icon name='calendar' className='icon-secondary'></Icon>
              <TextBase className='ml-2 text-bold'>{feed.schedule?.title}</TextBase>
            </div>
            <div className='flex items-center mt-1'>
              <Icon name='time' className='icon-secondary'></Icon>
              <TextBase className='ml-2'>{feed.schedule?.formatScheduleTime}</TextBase>
            </div>
            <div className='flex items-center mt-1'>
              <Icon name='location' className='icon-secondary'></Icon>
              <TextBase className='ml-2'>{feed.schedule?.place}</TextBase>
            </div>
          </div>
        )}

        <Pad className='h-4'></Pad>
        <XDivider></XDivider>

        <div className='flex py-4'>
          <div
            className='flex items-center mr-4'
            onClick={async () => {
              await $feed.toggleFeedLike(feed.id, !feed.isLike)
            }}
          >
            <Icon name={feed.isLike ? 'heart-solid' : 'heart'} className='mr-2 icon-secondary'></Icon>
            <TextSm>{feed.likeCount}</TextSm>
          </div>
          <div className='flex items-center' onClick={onClick}>
            <Icon name={feed.writtenComment ? 'chat-solid' : 'chat'} className='mr-2 icon-secondary'></Icon>
            <TextSm>{feed.comments?.length}</TextSm>
          </div>
        </div>

        {feed.comments.length ? (
          <div className='py-2' onClickCapture={onClickWithAutoFocus}>
            {feed.comments?.slice(0, isDetail ? undefined : 3).map((v) => (
              <CommentItem
                key={v.id}
                className='py-3'
                comment={v}
                feedId={feed.id}
                showOverlowMenu={isDetail && $auth.user.id === v.user.id}
                collapse={!isDetail}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Pad className='h-2' />
    </li>
  )
}
