import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { TextXl } from '../atoms/TextXlComponent'
import { CommunitySelectorModalContents } from '../modals/CommunitySelectorModalContentsComponent'

export interface ICommunitySelector {
  disabled?: boolean
}

export const CommunitySelector: FC<ICommunitySelector> = ({ disabled = false }) => {
  const { $community, $ui } = useStore()

  return useObserver(() => (
    <div
      className='flex items-center'
      onClick={() =>
        !disabled &&
        $ui.showModal({
          title: '공동체 선택',
          children: <CommunitySelectorModalContents />,
        })
      }
    >
      <TextXl className='mr-2 text-bold my-2'>{$community.community?.name}</TextXl>
      <Icon name='arrow' size={20} className='icon-rotate-270' color={disabled ? 'gray' : undefined}></Icon>
    </div>
  ))
}
