import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { CategorySelectorModalContents } from '../modals/CategorySelectorModalContentsComponent'

export interface ICategorySelector {
  categories: { id: number; name: string }[]
  selectedId: number
  onSelect: (id: number) => void
}

export const CategorySelector: FC<ICategorySelector> = ({ categories, selectedId, onSelect }) => {
  const { $ui } = useStore()

  return (
    <div
      className='flex justify-between items-center px-3'
      onClick={() =>
        $ui.showModal({
          title: '카테고리 선택',
          children: (
            <CategorySelectorModalContents
              categories={categories}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ),
        })
      }
    >
      <TextBase>
        {selectedId > 0 ? categories.find((c) => c.id === selectedId)?.name : '카테고리 선택'}
      </TextBase>
      <Icon name='arrow' className='icon-rotate-180' />
    </div>
  )
}
