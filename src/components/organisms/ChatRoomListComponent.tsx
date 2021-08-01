import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { Spinner } from '../atoms/SpinnerComponent'
import { ChatRoomListItem } from '../molecules/ChatRoomListItemComponent'
import { NoContents } from '../molecules/NoContentsComponent'

interface IChatRoomList {}

export const ChatRoomList: React.FC<IChatRoomList> = () => {
  const { $chat } = useStore()

  useEffect(() => {}, [$chat.rooms])

  return useObserver(() =>
    $chat.getRooms.match({
      pending: () => <Spinner position='center' />,
      resolved: () => (
        <>
          <NoContents show={$chat.rooms.length <= 0} isFull={true} />
          <ul className='py-1'>
            {$chat.rooms.map((v, i) => (
              <ChatRoomListItem key={i} room={v} />
            ))}
          </ul>
        </>
      ),
    })
  )
}
