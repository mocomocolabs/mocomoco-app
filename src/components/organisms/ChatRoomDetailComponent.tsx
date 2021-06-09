import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { Profile } from '../atoms/ProfileComponent'

interface IChatRoomDetail {
  roomId: number
}

// TODO: roomId is defined but never used
export const ChatRoomDetail: React.FC<IChatRoomDetail> = ({ roomId }) => {
  const { $chat, $auth } = useStore()

  useEffect(() => {}, [$chat.room?.chats])

  return useObserver(() => {
    return (
      <>
        <ul className='pl-0'>
          {$chat.room?.chats?.map((v, i) => (
            <li key={i} className={`flex my-2 ${v.user.id === $auth.user.id && 'flex-row-reverse'}`}>
              <Profile url={v.user.profileUrl}></Profile>
              <div
                className={`py-2 px-3 mx-2 br-xlg pre-line ${
                  v.user.id === $auth.user.id ? 'bg-m-green' : 'bg-m-gray'
                }`}
              >
                {v.message}
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  })
}
