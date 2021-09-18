import { useCallback } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoom } from '../../models/chat-room'
import { ChatRoomType } from '../../models/chat.d'
import { ChatRoomListItem } from '../molecules/ChatRoomListItemComponent'
import { NoContents } from '../molecules/NoContentsComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'

interface IChatRoomList {}

export const ChatRoomList: React.FC<IChatRoomList> = () => {
  const { $chat } = useStore()

  const sortCreatedAtDsc = useCallback(
    (a: ChatRoom, b: ChatRoom) =>
      (a.chats?.length > 0 ? a.chats[0] : a).createdAt >= (b.chats?.length > 0 ? b.chats[0] : b).createdAt
        ? -1
        : 1,
    []
  )

  return (
    <TaskObserver taskTypes={$chat.getRooms} spinnerPosition='center'>
      {() => {
        const rooms = $chat.rooms
          ?.filter((r) => [ChatRoomType.ALL, r.type].includes($chat.selectedRoomType))
          .sort(sortCreatedAtDsc)

        return rooms.length > 0 ? (
          <ul className='py-1'>
            {rooms.map((v) => (
              <ChatRoomListItem key={v.id} room={v} />
            ))}
          </ul>
        ) : (
          <NoContents isFull={true}>똑똑, 여기 아무도 없나요?</NoContents>
        )
      }}
    </TaskObserver>
  )
}
