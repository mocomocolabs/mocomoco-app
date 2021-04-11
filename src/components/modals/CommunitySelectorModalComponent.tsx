import { IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction } from 'react'
import { useStore } from '../../hooks/use-store'
import { storage } from '../../services/storage-service'
import { TextLg } from '../atoms/TextLgComponent'
import { Modal } from './ModalComponent'

export interface ICommunitySelectorModal {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const CommunitySelectorModal: FC<ICommunitySelectorModal> = ({ isShow, setIsShow }) => {
  const { $community } = useStore()

  return useObserver(() => (
    <Modal isShow={isShow} setIsShow={setIsShow} title='지역 / 공동체 선택'>
      <ul className='px-container pt-2'>
        {$community.communities.map((v) => (
          <li
            key={v.id}
            className='py-2'
            onClick={() => {
              storage.setCommunityId(v.id)
              $community.setSelectedId(v.id)
              setIsShow(false)
            }}
          >
            <div className='flex-between-center'>
              <TextLg>{v.name}</TextLg>
              {v.id === storage.communityId && <IonIcon icon={checkmark}></IonIcon>}
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  ))
}
