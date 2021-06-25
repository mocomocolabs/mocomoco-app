import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { IFeed } from '../../models/feed.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { Icon } from '../atoms/IconComponent'
import { OverflowMenuIcon } from '../atoms/OverflowMenuIconComponent'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { CommentItem } from './CommentItemComponent'
import { ImageSlider } from './ImageSliderComponent'

interface IFeedItem {
  feed: IFeed
  isDetail?: boolean
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

export const FeedItem: FC<IFeedItem> = ({ feed, isDetail = false, onDelete, onEdit }) => {
  // TODO: $auth를 parameter로 넘기던지 organisms로 승격
  const { $auth, $feed } = useStore()

  return useObserver(() => (
    <li className='py-4'>
      <div className='flex-col'>
        <TextBase>{feed.title}</TextBase>
        <div className='flex-between-center'>
          <div className='flex'>
            <Profile url={feed.user.profileUrl}></Profile>
            <div className='flex-col'>
              <TextBase className=''>{feed.user.nickname}</TextBase>
              <TextBase className='dim'>{timeDiff(feed.createdAt)}</TextBase>
            </div>
          </div>

          <OverflowMenuIcon show={$auth.user.id === feed.user.id} onDelete={onDelete} onEdit={onEdit} />
        </div>

        {isDetail ? (
          <div>
            <TextBase>{feed.content}</TextBase>
          </div>
        ) : (
          <div onClick={() => route.feedDetail(feed.id)}>
            <TextBase>{feed.content}</TextBase>
          </div>
        )}

        {feed.type === 'SCHEDULE' && (
          <div className='flex'>
            <Icon name='calendar'></Icon>
            <div className='ml-2 flex-col flex-1'>
              <TextLg>{feed.scheduleTitle}</TextLg>
              <TextBase className='dim'>{feed.scheduleDate}</TextBase>
            </div>
          </div>
        )}
        {feed.imageUrls?.length > 0 && (
          <div>
            <ImageSlider urls={feed.imageUrls}></ImageSlider>
          </div>
        )}
        <div className='flex'>
          <div
            className='flex items-center mr-4'
            onClick={async () => {
              await $feed.toggleFeedLike(feed.id, !feed.isLike)
            }}
          >
            <Icon name={feed.isLike ? 'heart-solid' : 'heart'} className='mr-2'></Icon>
            <TextBase>{feed.likeCount}</TextBase>
          </div>
          <div
            className='flex items-center'
            onClick={() => {
              if (!isDetail) {
                route.feedDetail(feed.id, { autoFocus: true })
              }
            }}
          >
            <Icon
              name={feed.writtenComment ? 'conversation-bubble-solid' : 'conversation-bubble'}
              className='mr-2'
            ></Icon>
            <TextBase>{feed.comments?.length}</TextBase>
          </div>
        </div>
        <div
          className='py-4'
          onClick={() => {
            if (!isDetail) {
              route.feedDetail(feed.id)
            }
          }}
        >
          {feed.comments?.map((v) => (
            <CommentItem
              key={v.id}
              comment={v}
              feedId={feed.id}
              showOverlowMenu={isDetail && $auth.user.id === v.id}
            ></CommentItem>
          ))}
        </div>
      </div>
    </li>
  ))
}
