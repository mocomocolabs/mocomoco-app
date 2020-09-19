import { IonInput } from '@ionic/react'
import React from 'react'
import { useStore } from '../../hooks/use-store'

export const NewsSearch: React.FC = () => {
  const { news } = useStore()

  return (
    <div className='my-2'>
      <div className='flex bg-m-red br-sm shadow-mist'>
        <div className='p-2 flex-center'>
          <img src='/assets/img/enjoy.gif' className='w-6 h-6 br-full shadow-md' alt='' />
        </div>
        <div className='flex-1 flex-between-center'>
          <IonInput
            className='white text-bold text-sm'
            placeholder={'검색어 입력'}
            onIonChange={(e) => {
              news.setQuery(e.detail.value ?? '')
            }}
          />
          <span role='img' aria-label='smile' className='rotate mr-4'>
            😎
          </span>
        </div>
      </div>
    </div>
  )
}
