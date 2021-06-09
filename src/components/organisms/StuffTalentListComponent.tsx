import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
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
  const { $auth } = useStore()

  useEffect(() => {
    store.getItems(search, filter)
  }, [store, search, filter])

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
              <StuffTalentItem
                key={item.id}
                loginUserId={$auth.user.id}
                path={store.pathName}
                item={item}
                onDelete={onDeleteItem}
              />
            ))}
          </ul>
          <ContentPopover></ContentPopover>
        </>
      ),
    })
  )
}
