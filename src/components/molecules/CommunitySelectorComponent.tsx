import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { TextHeader } from '../atoms/TextHeaderComponent'
import { CommunitySelectorModalContents } from '../modals/CommunitySelectorModalContentsComponent'

export interface ICommunitySelector {
  name?: string
  disabled?: boolean
}

export const CommunitySelector: FC<ICommunitySelector> = ({ name, disabled = false }) => {
  const { $community, $ui } = useStore()

  return useObserver(() => (
    <div
      className='flex items-center gap-2'
      onClick={() =>
        !disabled &&
        $ui.showModal({
          title: '공동체 선택',
          render: () => <CommunitySelectorModalContents />,
        })
      }
    >
      <TextHeader>{name || $community.community?.name}</TextHeader>
      {!disabled && <Icon name='arrow' size={20} className='icon-rotate-270' />}
    </div>
  ))
}
