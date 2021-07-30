import { useObserver } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { TextXl } from '../atoms/TextXlComponent'
import { CommunitySelectorModal } from '../modals/CommunitySelectorModalComponent'

export interface ICommunitySelector {
  disabled?: boolean
}

export const CommunitySelector: FC<ICommunitySelector> = ({ disabled = false }) => {
  const { $community } = useStore()
  // TODO: modal의 open 상태를 store로 관리하여. hardware back 버튼을 제어할 필요가 있음
  const [isShowModal, setIsShowModal] = useState(false)

  return useObserver(() => (
    <>
      <div className='flex items-center' onClick={() => !disabled && setIsShowModal(true)}>
        <TextXl className='mr-2 text-bold'>{$community.community?.name}</TextXl>
        <Icon name='arrow' size={20} className='icon-rotate-270' color={disabled ? 'gray' : undefined}></Icon>
      </div>

      <CommunitySelectorModal isShow={isShowModal} setIsShow={setIsShowModal}></CommunitySelectorModal>
    </>
  ))
}
