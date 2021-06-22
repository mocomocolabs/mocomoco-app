import { IonBackdrop } from '@ionic/react'

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
    <div className='absolute z-10 w-full bg-white'>
      {filterInfos.map(({ filter, items, onSelect }) =>
        items.map(({ value, label }) => (
          <div
            key={value}
            onClick={() => {
              onSelect(filter.includes(value) ? filter.filter((v) => v !== value) : filter.concat(value))
            }}
          >
            {label}
            {filter.includes(value) ? ' V' : ''}
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
