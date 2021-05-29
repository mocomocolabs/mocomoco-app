import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { Task, TaskGroup } from 'mobx-task'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { TextXs } from '../atoms/TextXsComponent'
import { FeedItem } from '../molecules/FeedItemComponent'
import { ContentPopover } from './ContentPopoverComponent'

interface IFeedList {
  fetchTask: Task<any[], void>
}

export const FeedList: React.FC<IFeedList> = ({ fetchTask }) => {
  const { $feed } = useStore()

  useEffect(() => {
    fetchTask()
  }, [])

  // eslint-disable-next-line
  const taskGroup = TaskGroup<any[], void>([fetchTask, $feed.deleteFeed])

  return useObserver(() =>
    taskGroup.match({
      pending: () => (
        <div className='height-150 flex-center'>
          <IonSpinner color='tertiary' name='crescent' />
        </div>
      ),
      resolved: () =>
        $feed.feeds?.length > 0 ? (
          <>
            <ul className='pl-0 move-up'>
              {$feed.feeds.map((v, i) => (
                <FeedItem key={i} feed={v}></FeedItem>
              ))}
            </ul>
            <ContentPopover></ContentPopover>
          </>
        ) : (
          // TODO 목록 없을 때 표시할 공통컴포넌트 만들자
          <TextXs>목록이 없습니다</TextXs>
        ),
    })
  )
}
