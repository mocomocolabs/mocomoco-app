import { IonIcon } from '@ionic/react'
import { chevronDown } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { TextLg } from '../atoms/TextLgComponent'
import { CommunitySelectorModal } from '../modals/CommunitySelectorModalComponent'

export interface ICommunitySelector {}

export const CommunitySelector: FC<ICommunitySelector> = () => {
  const { community } = useStore()
  const [isShowModal, setIsShowModal] = useState(false)

  return useObserver(() => (
    <>
      <div className='flex items-center' onClick={() => setIsShowModal(true)}>
        <IonIcon icon={chevronDown}></IonIcon>
        <TextLg className='ml-2'>{community.community?.name}</TextLg>
      </div>

      <CommunitySelectorModal isShow={isShowModal} setIsShow={setIsShowModal}></CommunitySelectorModal>
    </>
  ))
}
