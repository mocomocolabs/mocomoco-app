import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { Task, TaskGroup } from 'mobx-task'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { TextXs } from '../atoms/TextXsComponent'
import { FeedItem } from '../molecules/FeedItemComponent'
import './FeedListComponent.scss'

interface IFeedList {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchTask: Task<any[], void>
}

export const FeedList: React.FC<IFeedList> = ({ fetchTask }) => {
  const { $feed } = useStore()

  useEffect(() => {
    fetchTask()
  }, [fetchTask])

  const taskGroup = [fetchTask, $feed.deleteFeed]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const observableTaskGroup = TaskGroup<any[], void>(taskGroup)

  const onDelete = async (id: number) => {
    await $feed.deleteFeed(id)
    fetchTask()
  }

  const onEdit = async (id: number) => {
    await $feed.getFeedForm(id)
    route.feedForm()
    fetchTask()
  }

  return useObserver(() =>
    observableTaskGroup.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () =>
        $feed.feeds?.length > 0 ? (
          <>
            <ul className='move-up feed-list'>
              {$feed.feeds.map((v, i) => (
                <FeedItem
                  key={i}
                  feed={v}
                  onEdit={() => onEdit(v.id)}
                  onDelete={() => onDelete(v.id)}
                ></FeedItem>
              ))}
            </ul>
          </>
        ) : (
          // TODO 목록 없을 때 표시할 공통컴포넌트 만들자
          <TextXs>목록이 없습니다</TextXs>
        ),
      rejected: () => {
        taskGroup.forEach((task) => task.reset())
        return <></>
      },
    })
  )
}
