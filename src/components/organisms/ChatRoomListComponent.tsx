import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomListItem } from '../molecules/ChatRoomListItemComponent'
import { NoContents } from '../molecules/NoContentsComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'

interface IChatRoomList {}

export const ChatRoomList: React.FC<IChatRoomList> = () => {
  const { $auth, $chat } = useStore()

  useEffect(() => {
    $chat.getRooms($auth.user.chatroomIds)
  }, [])

  return (
    <TaskObserver taskTypes={$chat.getRooms} spinnerPosition='center'>
      {() =>
        $chat.rooms?.length > 0 ? (
          <ul className='py-1'>
            {$chat.rooms.map((v, i) => (
              <ChatRoomListItem key={i} room={v} />
            ))}
          </ul>
        ) : (
          <NoContents isFull={true} />
        )
      }
    </TaskObserver>
  )
}
