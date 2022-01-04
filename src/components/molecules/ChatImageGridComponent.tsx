import { FC } from 'react'
import { Spinner } from '../atoms/SpinnerComponent'

export interface IChatImageGrid {
  imageUrls: string[]
  uploading?: boolean
}

export const ChatImageGrid: FC<IChatImageGrid> = ({ imageUrls, uploading = false }) => {
  const makeGridLineByLine = (items: string[], uploading: boolean) => {
    const grid = []

    for (let start = 0, key = 0; start < items.length; key++) {
      const end = items.length - start === 4 ? start + 2 : start + 3
      grid.push(makeGridLine(key, items.slice(start, end), uploading))
      start = end
    }

    return grid
  }

  const makeGridLine = (key: number, imageUrls: string[], uploading: boolean) => (
    <div key={key} className='grid grid-cols-3 column-gap-px'>
      {imageUrls.map((url, i) => (
        <div key={i}>
          <img src={url} className={uploading ? 'bg-disabled' : ''} />
        </div>
      ))}
    </div>
  )

  return (
    <div className='relative'>
      {uploading && <Spinner position='center' />}

      {makeGridLineByLine(imageUrls, uploading)}
    </div>
  )
}
