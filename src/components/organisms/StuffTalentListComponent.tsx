import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { routeFunc } from '../../models/stufftalent'
import { IStuffTalentFilter, StuffTalentStatus } from '../../models/stufftalent.d'
import { StuffTalentStore } from '../../stores/stufftalent-store'
import { NoContents } from '../molecules/NoContentsComponent'
import { StuffTalentItem } from '../molecules/StuffTalentItemComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'
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

  const { routeForm } = routeFunc[store.predefined.pageKey]

  const onEditItem = async (id: number) => {
    await store.getUpdateForm(id)
    routeForm({ goDetailOnSubmit: true })
  }

  const onDeleteItem = async (id: number) => {
    await store.deleteItem(id)
    await store.getItems(search, filter)
  }

  const onUpdateStatus = async (id: number, status: StuffTalentStatus) => {
    await store.updateItemStatus(id, status)
    await store.getItems(search, filter)
  }

  return (
    <TaskObserver taskTypes={[store.getItems, store.deleteItem]} spinnerPosition='center'>
      {() =>
        store.items?.length > 0 ? (
          <ul className='pl-0 move-up'>
            {store.items.map((item) => (
              <StuffTalentItem
                key={item.id}
                loginUserId={$auth.user.id}
                pageKey={store.predefined.pageKey}
                item={item}
                onEdit={onEditItem}
                onDelete={onDeleteItem}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </ul>
        ) : (
          <NoContents isFull={true}>
            {!!search ? (
              <p>
                아주 멀리까지 날아가봤지만
                <br />
                아무것도 찾지 못 했어요 :(
              </p>
            ) : undefined}
          </NoContents>
        )
      }
    </TaskObserver>
  )
}
