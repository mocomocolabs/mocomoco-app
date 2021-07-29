import _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useStore } from '../../hooks/use-store'
import { timeDiff } from '../../utils/datetime-util'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { TextXs } from '../atoms/TextXsComponent'

interface IChatRoomDetail {}

export const ChatRoomDetail: React.FC<IChatRoomDetail> = ({}) => {
  const { $chat, $auth } = useStore()

  const loadMore = useCallback(async () => {
    await $chat.getChatMessages($chat.currentRoomId!, _.min($chat.room?.chats.map((v) => v.id))!)
  }, [])

  return useObserver(() => {
    return (
      <section
        id='scrollable'
        className='px-container'
        style={{
          height: 'calc(100vh - 100px)',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <InfiniteScroll
          dataLength={$chat.room?.chats.length ?? 0}
          next={loadMore}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true}
          hasMore={true}
          scrollableTarget='scrollable'
          loader={<></>}
        >
          {$chat.room?.chats.map((v, i) => {
            const isMe = v.user.id === $auth.user.id
            return (
              <div key={i} className={`flex my-3 ${v.user.id === $auth.user.id && 'flex-row-reverse'}`}>
                {!isMe && <ProfileImage url={v.user.profileUrl}></ProfileImage>}
                <div className='flex-col ml-2'>
                  {!isMe && (
                    <div className='flex'>
                      <TextXs className='text-bold'>{v.user.nickname}</TextXs>
                      <TextXs className='gray ml-1'>{v.user.communities[0].name}</TextXs>
                    </div>
                  )}
                  <div className={`flex items-end mt-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                    <TextSm
                      className={`py-2 px-3 br-xlg pre-line ${isMe ? 'bg-s-secondary' : 'bg-s-primary'}`}
                    >
                      {v.message}
                    </TextSm>
                    <TextXs className='mx-1 gray no-wrap'>{timeDiff(v.createdAt)}</TextXs>
                  </div>
                </div>
              </div>
            )
          })}
        </InfiniteScroll>
      </section>
    )
  })
}
