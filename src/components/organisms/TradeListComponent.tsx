import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import React, { useLayoutEffect } from 'react'
import { TradeStore } from '../../stores/trade-store'
import { TextBase } from '../atoms/TextBaseComponent'
import { TradeItem } from '../molecules/TradeItemComponent'
import { ContentPopover } from './ContentPopoverComponent'

interface ITradeList {
  store: TradeStore
  searchKeyword: string
}

export const TradeList: React.FC<ITradeList> = ({ store, searchKeyword }) => {
  // 여기는 useLayoutEffect 사용함
  // 문제 : segment가 바뀌면 다른 store prop이 전달되는데, 해당 store에 data가 담겨 있을 경우에
  // useObserver 안에서 pending state를 받기 전에 그 data가 먼저 표시된 후 loading으로 넘어 간다.
  // 원인 : useEffect는 다음 번 render에 앞서 비동기적으로 호출되기 때문에 타이밍이 빠르다.
  // 해결 : useLayoutEffect를 사용함으로써 render 중에 getItems 호출하도록 한다.
  useLayoutEffect(() => {
    store.getItems(searchKeyword)
  }, [searchKeyword, store])

  // eslint-disable-next-line
  const taskGroup = TaskGroup<any[], void>([store.getItems, store.deleteItem])

  return useObserver(() =>
    taskGroup.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () => (
        <>
          <div hidden={store.items.length > 0} className='text-center'>
            <TextBase>검색결과가 없어요</TextBase>
          </div>
          <ul className='pl-0 move-up'>
            {store.items.map((item) => (
              <TradeItem key={item.id} store={store} item={item} searchKeyword={searchKeyword} />
            ))}
          </ul>
          <ContentPopover></ContentPopover>
        </>
      ),
    })
  )
}
