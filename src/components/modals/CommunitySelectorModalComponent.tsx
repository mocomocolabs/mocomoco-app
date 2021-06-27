import { IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { useStore } from '../../hooks/use-store'
import { allCommunity } from '../../stores/community-store'
import { TextLg } from '../atoms/TextLgComponent'
import { Modal } from './ModalComponent'

export interface ICommunitySelectorModal {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const CommunitySelectorModal: FC<ICommunitySelectorModal> = ({ isShow, setIsShow }) => {
  const { $community } = useStore()

  const communites = useMemo(() => [allCommunity, ...$community.communities], [$community.communities])

  return useObserver(() => (
    <Modal isShow={isShow} setIsShow={setIsShow} title='지역 / 공동체 선택'>
      <ul className='px-container pt-2'>
        {communites.map((v, i) => (
          <li
            key={i}
            className='py-2'
            onClick={() => {
              $community.setSelectedId(v.id)
              setIsShow(false)
            }}
          >
            <div className='flex-between-center'>
              <TextLg>{v.name}</TextLg>
              {v.id === $community.selectedId && <IonIcon icon={checkmark}></IonIcon>}
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  ))
}
