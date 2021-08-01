import { Task } from 'mobx-task'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { FeedItem } from '../molecules/FeedItemComponent'
import { NoContents } from '../molecules/NoContentsComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'
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

  const onDelete = async (id: number) => {
    await $feed.deleteFeed(id)
    fetchTask()
  }

  const onEdit = async (id: number) => {
    await $feed.getFeedForm(id)
    route.feedForm()
    fetchTask()
  }

  return (
    <TaskObserver taskTypes={[fetchTask, $feed.deleteFeed]} spinnerPosition='center'>
      {() =>
        $feed.feeds?.length > 0 ? (
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
        ) : (
          <NoContents isFull={true} />
        )
      }
    </TaskObserver>
  )
}
