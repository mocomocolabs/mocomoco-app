import { Task } from 'mobx-task'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { IFeed } from '../../models/feed.d'
import { SEGMENT_KEYS } from '../../models/segment.d'
import { route } from '../../services/route-service'
import { hms, ymd } from '../../utils/datetime-util'
import { FeedItem } from '../molecules/FeedItemComponent'
import { NoContents } from '../molecules/NoContentsComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'
import './FeedListComponent.scss'

interface IFeedList {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchTask: Task<any[], void>
  segment?: SEGMENT_KEYS
}

interface IFeedFilter {
  [key: string]: ((value: IFeed, index: number, array: IFeed[]) => boolean) | undefined
}

const filter: IFeedFilter = {
  [SEGMENT_KEYS.feed]: undefined,
  [SEGMENT_KEYS.schedule]: ({ schedule }) => {
    const futureSchedule = !!schedule?.isUse && schedule.startDate >= ymd() && schedule.startTime >= hms()
    return futureSchedule
  },
}

const sort: { [key: string]: ((a: IFeed, b: IFeed) => number) | undefined } = {
  [SEGMENT_KEYS.feed]: undefined,
  [SEGMENT_KEYS.schedule]: ({ schedule: first }, { schedule: second }) => {
    const startDiff =
      Number(first!.startDate + first!.startTime!) - Number(second!.startDate + second!.startTime)
    const endDiff = Number(first!.endDate + first!.endTime!) - Number(second!.endDate + second!.endTime)

    return startDiff === 0 ? endDiff : startDiff
  },
}

export const FeedList: React.FC<IFeedList> = ({ fetchTask, segment = SEGMENT_KEYS.feed }) => {
  const { $feed } = useStore()

  useEffect(() => {
    fetchTask()
  }, [fetchTask])

  const onDelete = async (feed: IFeed) => {
    await $feed.deleteFeed(feed)
    fetchTask()
  }

  const onEdit = async (id: number) => {
    await $feed.getUpdateForm(id)
    route.feedForm({ goDetailOnSubmit: true })
    fetchTask()
  }

  return (
    <TaskObserver taskTypes={[fetchTask, $feed.deleteFeed]} spinnerPosition='center'>
      {() => {
        const feeds = $feed.feeds
        const filtered = !!filter[segment] ? feeds?.filter(filter[segment]!) : feeds
        const sorted = !!sort[segment] ? filtered.sort(sort[segment]) : filtered

        return sorted.length > 0 ? (
          <ul className='move-up feed-list'>
            {sorted.map((v, i) => (
              <FeedItem key={i} feed={v} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </ul>
        ) : (
          <NoContents isFull={true} />
        )
      }}
    </TaskObserver>
  )
}
