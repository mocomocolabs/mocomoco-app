import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'

export interface ICategorySelectorModal {
  categories: { id: number; name: string }[]
  selectedId: number
  onSelect: (id: number) => void
}

export const CategorySelectorModalContents: FC<ICategorySelectorModal> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  const { $ui } = useStore()

  return (
    <ul>
      {categories.map((v) => (
        <li
          key={v.id}
          className='border-bottom py-3'
          onClick={() => {
            onSelect(v.id)
            $ui.hideModal()
          }}
        >
          <div className='px-container flex-between-center'>
            <TextBase className={`flex-center ${v.id !== selectedId && 'gray'}`}>{v.name}</TextBase>
            {v.id === selectedId && <Icon name='check-no-border' className='icon-secondary' />}
          </div>
        </li>
      ))}
    </ul>
  )
}
