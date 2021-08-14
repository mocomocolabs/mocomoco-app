import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { ChatRoomType } from '../../models/chat'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'

export interface IChatroomTypeSelectorModal {
  typeNames: [type: ChatRoomType, name: string][]
  selectedType: ChatRoomType
  onSelect: (type: ChatRoomType) => void
}

export const ChatroomTypeSelectorModalContents: FC<IChatroomTypeSelectorModal> = ({
  typeNames,
  selectedType,
  onSelect,
}) => {
  const { $ui } = useStore()

  return (
    <ul>
      {typeNames.map(([type, name]: [ChatRoomType, string]) => (
        <li
          key={type}
          className='border-bottom py-3'
          onClick={() => {
            onSelect(type)
            $ui.hideModal()
          }}
        >
          <div className='px-container flex-between-center'>
            <TextBase className={`flex-center ${type !== selectedType && 'gray'}`}>{name}</TextBase>
            {type === selectedType && <Icon name='check-no-border' className='icon-secondary' />}
          </div>
        </li>
      ))}
    </ul>
  )
}
