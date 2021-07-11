import { useObserver } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { CategorySelectorModal } from '../modals/CategorySelectorModalComponent'

export interface ICategorySelector {
  categories: { id: number; name: string }[]
  selectedId: number
  onSelect: (id: number) => void
}

export const CategorySelector: FC<ICategorySelector> = ({ categories, selectedId, onSelect }) => {
  // TODO: modal의 open 상태를 store로 관리하여. hardware back 버튼을 제어할 필요가 있음
  const [isShowModal, setIsShowModal] = useState(false)

  return useObserver(() => (
    <>
      <div className='flex justify-between items-center px-3' onClick={() => setIsShowModal(true)}>
        <TextSm>
          {selectedId > 0 ? categories.find((c) => c.id === selectedId)?.name : '카테고리 선택'}
        </TextSm>
        <Icon name='arrow' className='icon-rotate-180' />
      </div>

      <CategorySelectorModal
        categories={categories}
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    </>
  ))
}
