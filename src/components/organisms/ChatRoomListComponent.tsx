import { useStore } from '../../hooks/use-store'
import { ChatRoomType } from '../../models/chat.d'
import { ChatRoomListItem } from '../molecules/ChatRoomListItemComponent'
import { NoContents } from '../molecules/NoContentsComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'

interface IChatRoomList {}

export const ChatRoomList: React.FC<IChatRoomList> = () => {
  const { $chat } = useStore()

  return (
    <TaskObserver taskTypes={$chat.getRooms} spinnerPosition='center'>
      {() => {
        const rooms = $chat.rooms?.filter((r) => [ChatRoomType.ALL, r.type].includes($chat.selectedRoomType))

        return rooms.length > 0 ? (
          <ul className='py-1'>
            {rooms.map((v, i) => (
              <ChatRoomListItem key={i} room={v} />
            ))}
          </ul>
        ) : (
          <NoContents isFull={true}>똑똑, 여기 아무도 없나요?</NoContents>
        )
      }}
    </TaskObserver>
  )
}
