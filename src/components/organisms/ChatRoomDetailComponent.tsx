import _ from 'lodash'
import { Observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useStore } from '../../hooks/use-store'
import { ChatType, IChat } from '../../models/chat.d'
import { timeDiff } from '../../utils/datetime-util'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { TextXs } from '../atoms/TextXsComponent'

interface IChatRoomDetail {}

export const ChatRoomDetail: React.FC<IChatRoomDetail> = ({}) => {
  const { $chat, $auth } = useStore()

  const loadMore = useCallback(async () => {
    await $chat.getChatMessages($chat.currentRoomId!, _.min($chat.room?.chats.map((v) => v.id))!)
  }, [])

  const makeGridLine = (imageUrls: string[], uploading: boolean) => (
    <div className='grid grid-cols-3' style={{ columnGap: '1px' }}>
      {imageUrls.map((url, i) => (
        <div key={i}>
          <img src={url} className={uploading ? 'bg-disabled' : ''} />
        </div>
      ))}
    </div>
  )

  const makeGridLineByLine = (items: string[], uploading: boolean) => {
    const grid = []

    for (let start = 0; start < items.length; ) {
      const end = items.length - start === 4 ? start + 2 : start + 3
      grid.push(makeGridLine(items.slice(start, end), uploading))
      start = end
    }

    return grid
  }

  //TODO ChatImagesComponent로 추출하자
  const imagesView = useCallback(
    (imageUrls: string[], uploading = false) => (
      <div className='relative'>
        {uploading && <Spinner position='center' />}

        {makeGridLineByLine(imageUrls, uploading)}
      </div>
    ),
    []
  )

  return (
    <section
      id='scrollable'
      className='px-container'
      style={{
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      <Observer>
        {() => {
          const chatData = $chat.room?.chats ?? []
          const uploadingImages = $chat.imagesForm[$chat.currentRoomId!] ?? []

          const chatList: IChat[] = [
            ...uploadingImages.map(
              ({ images }, i) =>
                ({
                  id: $chat.lastMessageId! + 1 + i,
                  createdAt: '',
                  type: ChatType.UPLOADING,
                  message: '',
                  user: { id: $auth.user.id },
                  imageUrls: images.map((image) => image?.preview),
                } as IChat)
            ),
            ...chatData,
          ]

          console.log('chatList=', chatList)
          console.log('chatList.length=', chatList.length)
          //TODO: imagesForm 초기화한 후부터 웹소켓으로 새 데이터 수신되기 전까지는 length가 -1 되니까 리스트가 위아래로 움직이게 된다.
          // 1) imagesForm의 해당 데이터를 삭제하는 시점 = insert 완료 후
          // 2) 동시에, chats에 insert해야 함? length가 그 찰나에 length가 변경되는 걸 막을 수 있을까? block 시킬 수 있나?

          return (
            <InfiniteScroll
              dataLength={chatList.length}
              next={loadMore}
              className='flex-col-reverse'
              inverse={true}
              hasMore={true}
              scrollableTarget='scrollable'
              loader={<></>}
            >
              {chatList.map((v) => {
                const isMe = v.user.id === $auth.user.id

                return (
                  <div key={v.id} className={`${isMe ? 'flex-row-reverse' : 'flex'} my-3`}>
                    {!isMe && <ProfileImage url={v.user.profileUrl}></ProfileImage>}
                    <div className='flex-col ml-2'>
                      {!isMe && (
                        <div className='flex'>
                          <TextXs className='text-bold'>{v.user.nickname}</TextXs>
                          <TextXs className='gray ml-1'>{v.user.communities[0].name}</TextXs>
                        </div>
                      )}

                      <div className={`${isMe ? 'flex-row-reverse' : 'flex'} items-end mt-1 gap-1`}>
                        {v.imageUrls?.length > 0 ? (
                          imagesView(v.imageUrls, v.type === ChatType.UPLOADING)
                        ) : (
                          <TextSm
                            className={`py-2 px-3 br-xlg pre-line ${
                              isMe ? 'bg-s-secondary' : 'bg-s-primary'
                            }`}
                          >
                            {v.message}
                          </TextSm>
                        )}
                        <TextXs className='mx-1 gray no-wrap'>{timeDiff(v.createdAt)}</TextXs>
                      </div>
                    </div>
                  </div>
                )
              })}
            </InfiniteScroll>
          )
        }}
      </Observer>
    </section>
  )
}
