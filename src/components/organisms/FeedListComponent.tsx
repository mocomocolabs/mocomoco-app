import { IonIcon, IonPopover, IonSpinner } from '@ionic/react'
import { calendar, chatbox, cloud, ellipsisVertical } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { IFeed } from '../../models/feed'
import { IPopover } from '../../models/popover'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { CommentItem } from '../molecules/CommentItemComponent'

interface IFeedList {}

export const FeedList: React.FC<IFeedList> = () => {
  const { feed } = useStore()
  const [showPopover, setShowPopover] = useState<{ open: boolean; event: Event | undefined }>({
    open: false,
    event: undefined,
  })

  useEffect(() => {
    feed.getFeeds()
    // eslint-disable-next-line
  }, [])

  return useObserver(() =>
    feed.getFeeds.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <>
          <ul className='pl-0 move-up'>
            {feed.feeds.map((v, i) => (
              <FeedItem key={i} feed={v} setShowPopover={setShowPopover}></FeedItem>
            ))}
          </ul>
          <IonPopover
            isOpen={showPopover.open}
            event={showPopover.event}
            onDidDismiss={(e) => setShowPopover({ open: false, event: undefined })}
          >
            <ul className='p-4'>
              <li
                className='p-2'
                onClick={() => {
                  setShowPopover({ open: false, event: undefined })
                }}
              >
                수정
              </li>
              <li
                className='p-2'
                onClick={() => {
                  setShowPopover({ open: false, event: undefined })
                }}
              >
                삭제
              </li>
            </ul>
          </IonPopover>
        </>
      ),
    })
  )
}

interface IFeedItem {
  feed: IFeed
  setShowPopover: Dispatch<SetStateAction<IPopover>>
}

export const FeedItem: FC<IFeedItem> = ({ feed, setShowPopover }) => {
  return (
    <>
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
            <IonIcon
              icon={ellipsisVertical}
              onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
            ></IonIcon>
          </div>
          <div>
            <TextBase>{feed.content}</TextBase>
          </div>
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
            {feed.imageUrls.map((v, i) => (
              <img className='w-8 h-5' key={i} src={v} alt=''></img>
            ))}
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
          <XDivider></XDivider>
          <div className='py-4'>
            {feed.comments.map((v) => (
              <CommentItem key={v.id} comment={v}></CommentItem>
            ))}
          </div>
          <XDivider></XDivider>
        </div>
      </li>
    </>
  )
}
