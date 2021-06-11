import { IonBackdrop } from '@ionic/react'

// TODO any를 사용하지 않을 방법 찾아보자
interface IFilterInfo {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  filter: (number | string)[]
  items: [id: number | string, name: string][]
  onSelect: ([]) => void
  /* eslint-enable */
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
