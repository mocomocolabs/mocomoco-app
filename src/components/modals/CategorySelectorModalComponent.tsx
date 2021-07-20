import { useObserver } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
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
      <ul>
        {categories.map((v) => (
          <li
            key={v.id}
            className='border-bottom py-3'
            onClick={() => {
              onSelect(v.id)
              setIsShow(false)
            }}
          >
            <div className='px-container flex-between-center'>
              <TextBase className={`flex-center ${v.id !== selectedId && 'gray'}`}>{v.name}</TextBase>
              {v.id === selectedId && <Icon name='check-no-border' className='icon-secondary' />}
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  ))
}
