import { IonBackdrop } from '@ionic/react'

interface IFilterInfo {
  filter: (number | string)[]
  items: [id: number | string, name: string][]
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
        items.map(([key, name]) => (
          <div
            key={key}
            onClick={() => {
              onSelect(filter.includes(key) ? filter.filter((v) => v !== key) : filter.concat(key))
            }}
          >
            {name}
            {filter.includes(key) ? ' V' : ''}
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
