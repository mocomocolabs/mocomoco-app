import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { StuffItem } from '../molecules/StuffItemComponent'
import { ContentPopover } from './ContentPopoverComponent'

interface IStuffList {}

export const StuffList: React.FC<IStuffList> = () => {
  const { $stuff } = useStore()

  useEffect(() => {
    $stuff.getStuffs()
    // eslint-disable-next-line
  }, [])

  return useObserver(() =>
    $stuff.getStuffs.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <>
          <ul className='pl-0 move-up'>
            {$stuff.stuffs.map((v, i) => (
              <StuffItem key={i} stuff={v} isDetail={false}></StuffItem>
            ))}
          </ul>
          <ContentPopover></ContentPopover>
        </>
      ),
    })
  )
}
