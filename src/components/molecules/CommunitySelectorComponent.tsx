import { useObserver } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { TextXl } from '../atoms/TextXlComponent'
import { CommunitySelectorModal } from '../modals/CommunitySelectorModalComponent'

export interface ICommunitySelector {}

export const CommunitySelector: FC<ICommunitySelector> = () => {
  const { $community } = useStore()
  // TODO: modal의 open 상태를 store로 관리하여. hardware back 버튼을 제어할 필요가 있음
  const [isShowModal, setIsShowModal] = useState(false)

  return useObserver(() => (
    <>
      <div className='flex items-center' onClick={() => setIsShowModal(true)}>
        <Icon name='arrow' className='icon-rotate-270'></Icon>
        <TextXl className='ml-2 text-bold'>{$community.community?.name}</TextXl>
      </div>

      <CommunitySelectorModal isShow={isShowModal} setIsShow={setIsShowModal}></CommunitySelectorModal>
    </>
  ))
}
