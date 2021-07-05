import { IonBackdrop } from '@ionic/react'
import { Icon } from '../atoms/IconComponent'

interface IFilterInfo {
  filter: (number | string)[]
  items: { value: number | string; label: string }[]
  onSelect: ([]) => void
}

interface IFilterPopup {
  show: boolean
  filterInfos: IFilterInfo[]
  onClose: () => void
}

export const FilterPopup: React.FC<IFilterPopup> = ({ show, filterInfos, onClose }) => (
  <div className='justify-around' hidden={!show}>
    <div className='grid grid-cols-2 absolute z-10 w-full bg-white gap-4 px-4 pt-1 pb-4'>
      {filterInfos.map(({ filter, items, onSelect }) =>
        items.map(({ value, label }) => (
          <div
            key={value}
            className='inline-flex items-center gap-1 text-xs'
            onClick={() => {
              onSelect(filter.includes(value) ? filter.filter((v) => v !== value) : filter.concat(value))
            }}
          >
            <Icon name={`check${filter.includes(value) ? '-solid' : ''}`} className='icon-primary' /> {label}
          </div>
        ))
      )}
    </div>
    <IonBackdrop
      onIonBackdropTap={() => {
        onClose()
      }}
    />
  </div>
)
