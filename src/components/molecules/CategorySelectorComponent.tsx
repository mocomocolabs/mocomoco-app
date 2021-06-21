import { useObserver } from 'mobx-react-lite'
import { FC, useState } from 'react'
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
      <button
        className='w-full px-4 mb-4 py-3 br-base border-gray bg-white text-left text-sm'
        type='button'
        onClick={() => setIsShowModal(true)}
      >
        {selectedId > 0 ? categories.find((c) => c.id === selectedId)?.name : '카테고리 선택'}
      </button>

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
