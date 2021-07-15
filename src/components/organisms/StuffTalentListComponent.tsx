import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { routeFunc } from '../../models/stufftalent'
import { IStuffTalentFilter, StuffTalentStatus } from '../../models/stufftalent.d'
import { StuffTalentStore } from '../../stores/stufftalent-store'
import { TextBase } from '../atoms/TextBaseComponent'
import { StuffTalentItem } from '../molecules/StuffTalentItemComponent'

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
    routeForm()
  }

  const onDeleteItem = async (id: number) => {
    await store.deleteItem(id)
    await store.getItems(search, filter)
  }

  const onUpdateStatus = async (id: number, status: StuffTalentStatus) => {
    await store.updateItemStatus(id, status)
    await store.getItems(search, filter)
  }

  const taskGroup = [store.getItems, store.deleteItem]
  // eslint-disable-next-line
  const observableTaskGroup = TaskGroup<any[], void>(taskGroup)

  return useObserver(() =>
    observableTaskGroup.match({
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
                pageKey={store.predefined.pageKey}
                item={item}
                onEdit={onEditItem}
                onDelete={onDeleteItem}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </ul>
        </>
      ),
      rejected: () => {
        taskGroup.forEach((task) => task.reset())
        return <></>
      },
    })
  )
}
