import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import { useLayoutEffect } from 'react'
import { IStuffTalentFilter } from '../../models/stufftalent.d'
import { StuffTalentStore } from '../../stores/stufftalent-store'
import { TextBase } from '../atoms/TextBaseComponent'
import { StuffTalentItem } from '../molecules/StuffTalentItemComponent'
import { ContentPopover } from './ContentPopoverComponent'

interface IStuffTalentList {
  store: StuffTalentStore
  search: string
  filter: IStuffTalentFilter
}

export const StuffTalentList: React.FC<IStuffTalentList> = ({ store, search, filter }) => {
  // 여기는 useLayoutEffect 사용함
  // 문제 : segment가 바뀌면 다른 store prop이 전달되는데, 해당 store에 data가 담겨 있을 경우에
  // useObserver 안에서 pending state를 받기 전에 그 data가 먼저 표시된 후 loading으로 넘어 간다.
  // 원인 : useEffect는 다음 번 render에 앞서 비동기적으로 호출되기 때문에 타이밍이 빠르다.
  // 해결 : useLayoutEffect를 사용함으로써 render 중에 getItems 호출하도록 한다.
  useLayoutEffect(() => {
    store.getItems(search, filter)
  }, [search, filter])

  const onDeleteItem = async (id: number) => {
    await store.deleteItem(id)
    await store.getItems(search, filter)
  }

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
              <StuffTalentItem key={item.id} path={store.pathName} item={item} onDelete={onDeleteItem} />
            ))}
          </ul>
          <ContentPopover></ContentPopover>
        </>
      ),
    })
  )
}