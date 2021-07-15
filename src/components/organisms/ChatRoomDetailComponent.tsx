import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { ProfileImage } from '../atoms/ProfileImageComponent'

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
              <ProfileImage url={v.user.profileUrl}></ProfileImage>
              <div
                className={`py-2 px-3 mx-2 br-xlg pre-line ${
                  v.user.id === $auth.user.id ? 'bg-m-secondary' : 'bg-m-gray'
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
