import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { Task } from 'mobx-task'
import { useEffect, useMemo } from 'react'
import { FeedSlider } from '../components/molecules/FeedSliderComponent'
import { HomeHeader } from '../components/molecules/HomeHeaderComponent'
import { HomeTitle } from '../components/molecules/HomeTitleComponent'
import { NoContents } from '../components/molecules/NoContentsComponent'
import { StuffTalentItem } from '../components/molecules/StuffTalentItemComponent'
import { TaskObserver } from '../components/molecules/TaskObserverComponent'
import { ClubPopularSlider } from '../components/organisms/ClubPopularSliderComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { StuffTalentPageKey } from '../models/stufftalent.d'
import { route } from '../services/route-service'

export const HomePage: React.FC = () => {
  const { $ui, $community, $auth, $feed, $stuff, $talent, $club } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  const stufftalentFilter = useMemo(
    () => ({
      // TODO: isPublic테스트
      isPublic: false,
      communityId: $community.myCommunity?.id ?? null,
      userId: undefined,
      categories: [],
      notStatuses: [],
      types: [],
      limit: 3,
    }),
    [$community.myCommunity?.id]
  )

  interface Fetcher {
    [name: string]: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      taskType: Task<any, any>
      task: () => Promise<void>
    }
  }

  const fetcher: Fetcher = {
    stuffs: {
      taskType: $stuff.getItems,
      task: async () => fetcher.stuffs.taskType('', stufftalentFilter),
    },
    talents: {
      taskType: $talent.getItems,
      task: async () => fetcher.talents.taskType('', stufftalentFilter),
    },
    clubs: {
      taskType: $club.getPopularClubs,
      task: async () => fetcher.clubs.taskType(10),
    },
    feeds: {
      taskType: $feed.getHomeFeeds,
      task: async () => fetcher.feeds.taskType(),
    },
    schedules: {
      taskType: $feed.getHomeScheduleFeeds,
      task: async () => fetcher.schedules.taskType(),
    },
  }

  useEffect(() => {
    Object.values(fetcher).forEach((f) => f.task())
  }, [])

  // TODO: loader compositie or height fixed

  return useObserver(() => (
    <IonPage>
      <Header>
        <HomeHeader
          name={$community.myCommunity?.name}
          count={$community.myCommunity?.userCount}
        ></HomeHeader>
      </Header>

      <IonContent>
        <div className='px-container'>
          <HomeTitle title='이야기창고' route={() => route.feed()}></HomeTitle>
        </div>
        <TaskObserver taskTypes={[fetcher.feeds.taskType]} spinnerPosition='centerX'>
          {() => <FeedSlider items={$feed.homeFeeds} />}
        </TaskObserver>

        <div className='px-container'>
          {/* <HomeTitle title='다가오는 일정'></HomeTitle>
          <TaskObserver taskType={fetcher.schedules.taskType} spinnerPosition = 'centerX'>
            <HomeSchedule items={$feed.homeScheduleFeeds} className='pb-2' />
          </TaskObserver> */}
          <HomeTitle title='물건창고' route={() => route.stuff()}></HomeTitle>
          <TaskObserver taskTypes={fetcher.stuffs.taskType} spinnerPosition='centerX'>
            {() =>
              $stuff.items?.length > 0 ? (
                <ul className='move-up'>
                  {$stuff.items.map((item) => (
                    <StuffTalentItem
                      key={item.id}
                      loginUserId={$auth.user.id}
                      pageKey={StuffTalentPageKey.STUFF}
                      item={item}
                      hideMoreIcon
                    />
                  ))}
                </ul>
              ) : (
                <NoContents />
              )
            }
          </TaskObserver>

          <HomeTitle title='재능창고' route={() => route.talent()}></HomeTitle>
          <TaskObserver taskTypes={fetcher.talents.taskType} spinnerPosition='centerX'>
            {() =>
              $talent.items?.length > 0 ? (
                <ul className='move-up'>
                  {$talent.items.map((item) => (
                    <StuffTalentItem
                      key={item.id}
                      loginUserId={$auth.user.id}
                      pageKey={StuffTalentPageKey.TALENT}
                      item={item}
                      hideMoreIcon
                    />
                  ))}
                </ul>
              ) : (
                <NoContents />
              )
            }
          </TaskObserver>
        </div>

        <div className='px-container'>
          <HomeTitle title='소모임' route={() => route.clubs()}></HomeTitle>
        </div>
        <TaskObserver taskTypes={fetcher.clubs.taskType} spinnerPosition='centerX'>
          {() => <ClubPopularSlider clubs={$club.popularClubs} />}
        </TaskObserver>
      </IonContent>
    </IonPage>
  ))
}
