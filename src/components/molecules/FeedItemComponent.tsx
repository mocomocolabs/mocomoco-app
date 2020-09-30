import { IonIcon } from '@ionic/react'
import { calendar, chatbox, cloud, ellipsisVertical } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../hooks/use-store'
import { IFeed } from '../../models/feed'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { CommentItem } from './CommentItemComponent'
import { ImageSlider } from './ImageSliderComponent'

interface IFeedItem {
  feed: IFeed
  isDetail: boolean
}

export const FeedItem: FC<IFeedItem> = ({ feed, isDetail = false }) => {
  const history = useHistory()
  const { ui } = useStore()

  return useObserver(() => (
    <li className='py-4'>
      <div className='flex-col'>
        <div className='flex-between-center'>
          <div className='flex'>
            <Profile url={feed.user.profileUrl}></Profile>
            <div className='flex-col'>
              <TextBase className=''>{feed.user.nickname}</TextBase>
              <TextBase className='dim'>{feed.createdAt}</TextBase>
            </div>
          </div>
          <IonIcon icon={ellipsisVertical} onClick={(e) => ui.showPopover(e.nativeEvent)}></IonIcon>
        </div>

        {isDetail ? (
          <div>
            <TextBase>{feed.content}</TextBase>
          </div>
        ) : (
          <div onClick={() => history.push(`/feed/${feed.id}`)}>
            <TextBase>{feed.content}</TextBase>
          </div>
        )}

        {feed.type === 'SCHEDULE' && (
          <div className='flex'>
            <IonIcon icon={calendar} size='large'></IonIcon>
            <div className='ml-2 flex-col flex-1'>
              <TextLg>{feed.scheduleTitle}</TextLg>
              <TextBase className='dim'>{feed.scheduleDate}</TextBase>
            </div>
          </div>
        )}
        <div>
          <ImageSlider urls={feed.imageUrls}></ImageSlider>
        </div>
        <div className='flex-between-center'>
          <div className='flex items-center'>
            <IonIcon icon={cloud} className='mr-2'></IonIcon>
            <TextBase>씨앗 {feed.likeCount}</TextBase>
          </div>
          <div className='flex items-center'>
            <IonIcon icon={chatbox} className='mr-2'></IonIcon>
            <TextBase className=''>댓글</TextBase>
            <TextBase>씨앗 {feed.commentCount}</TextBase>
          </div>
        </div>
        {!isDetail && (
          <div className='flex'>
            <div className='flex-center flex-1'>
              <IonIcon icon={cloud} className='mr-2'></IonIcon>
              <TextBase>씨앗뿌리기</TextBase>
            </div>
            <div className='flex-center flex-1'>
              <IonIcon icon={chatbox} className='mr-2'></IonIcon>
              <TextBase className=''>댓글달기</TextBase>
            </div>
          </div>
        )}
        {isDetail && (
          <div className='flex flex-wrap items-center'>
            <TextLg className='gray w-12'>씨앗들</TextLg>
            {feed.likeProflieUrls?.slice(0, 9).map((v, i) => (
              <Profile key={i} url={v}></Profile>
            ))}
          </div>
        )}
        <XDivider></XDivider>
        <div className='py-4'>
          {feed.comments.map((v) => (
            <CommentItem key={v.id} comment={v}></CommentItem>
          ))}
        </div>
        <XDivider></XDivider>
      </div>
    </li>
  ))
}
