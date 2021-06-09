import { IonBackdrop } from '@ionic/react'
import React from 'react'

// TODO any를 사용하지 않을 방법 찾아보자
interface IFilterPopup {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  filter: any[]
  items: any[]
  print?: (item: any) => string
  onSelect: ([]) => void
  onClose: () => void
  /* eslint-enable */
}

export const FilterPopup: React.FC<IFilterPopup> = ({ filter, items, print, onSelect, onClose }) => {
  return (
    <>
      <div className='absolute z-10 w-full bg-white'>
        {items.map((item) => (
          <div
            key={item}
            onClick={() => {
              onSelect(filter.includes(item) ? filter.filter((v) => v !== item) : filter.concat(item))
            }}
          >
            {print ? print(item) : (item as string)}
            {filter.includes(item) ? ' V' : ''}
          </div>
        ))}
      </div>
      <IonBackdrop
        onIonBackdropTap={() => {
          onClose()
        }}
      />
    </>
  )
}
