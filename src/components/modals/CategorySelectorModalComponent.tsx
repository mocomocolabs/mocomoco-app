import { IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction } from 'react'
import { TextLg } from '../atoms/TextLgComponent'
import { Modal } from './ModalComponent'

export interface ICategorySelectorModal {
  categories: { id: number; name: string }[]
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  selectedId: number
  onSelect: (id: number) => void
}

export const CategorySelectorModal: FC<ICategorySelectorModal> = ({
  categories,
  isShow,
  setIsShow,
  selectedId,
  onSelect,
}) => {
  return useObserver(() => (
    <Modal isShow={isShow} setIsShow={setIsShow} title='카테고리 선택'>
      <ul className='px-container pt-2'>
        {categories.map((v) => (
          <li
            key={v.id}
            className='py-2'
            onClick={() => {
              onSelect(v.id)
              setIsShow(false)
            }}
          >
            <div className='flex-between-center'>
              <TextLg>{v.name}</TextLg>
              {v.id === selectedId && <IonIcon icon={checkmark}></IonIcon>}
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  ))
}
