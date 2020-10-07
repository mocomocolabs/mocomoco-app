import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useLayoutEffect } from 'react'
import { TradeStore } from '../../stores/trade-store'
import { TradeItem } from '../molecules/TradeItemComponent'
import { ContentPopover } from './ContentPopoverComponent'

interface ITradeList {
  store: TradeStore
}

export const TradeList: React.FC<ITradeList> = ({ store }) => {
  // 여기는 useLayoutEffect 사용함
  // 문제 : segment가 바뀌면 다른 store prop이 전달되는데, 해당 store에 data가 담겨 있을 경우에
  // useObserver 안에서 pending state를 받기 전에 그 data가 먼저 표시된 후 loading으로 넘어 간다.
  // 원인 : useEffect는 다음 번 render에 앞서 비동기적으로 호출되기 때문에 타이밍이 빠르다.
  // 해결 : useLayoutEffect를 사용함으로써 render 중에 getItems 호출하도록 한다.
  useLayoutEffect(() => {
    store.getItems()
  }, [store])

  return useObserver(() =>
    store.getItems.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <>
          <ul className='pl-0 move-up'>
            {store.items.map((v, i) => (
              <TradeItem key={i} store={store} items={v} isDetail={false}></TradeItem>
            ))}
          </ul>
          <ContentPopover></ContentPopover>
        </>
      ),
    })
  )
}