import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomType } from '../../models/chat.d'
import { Icon } from '../atoms/IconComponent'
import { TextXl } from '../atoms/TextXlComponent'
import { ChatroomTypeSelectorModalContents } from '../modals/ChatroomTypeSelectorModalContentsComponent'

export interface IChatroomTypeSelector {}

const chatroomTypeNames: [ChatRoomType, string][] = [
  [ChatRoomType.ALL, '전체 채팅'],
  [ChatRoomType.NORMAL, '일반 채팅'],
  [ChatRoomType.CLUB, '소모임 채팅'],
  [ChatRoomType.STUFF, '물건창고 채팅'],
  [ChatRoomType.TALENT, '재능창고 채팅'],
]

export const ChatroomTypeSelector: FC<IChatroomTypeSelector> = () => {
  const { $chat, $ui } = useStore()

  return useObserver(() => (
    <div
      className='flex items-center'
      onClick={() =>
        $ui.showModal({
          title: '채팅 선택',
          children: (
            <ChatroomTypeSelectorModalContents
              typeNames={chatroomTypeNames}
              selectedType={$chat.selectedRoomType}
              onSelect={(type: ChatRoomType) => $chat.setRoomType(type)}
            />
          ),
        })
      }
    >
      <TextXl className='mr-2 text-bold my-2'>
        {chatroomTypeNames.find(([type]) => type === $chat.selectedRoomType)?.[1]}
      </TextXl>
      <Icon name='arrow' size={20} className='icon-rotate-270' />
    </div>
  ))
}
