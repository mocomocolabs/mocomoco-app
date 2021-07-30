import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { FeedSlider } from '../components/molecules/FeedSliderComponent'
import { HomeHeader } from '../components/molecules/HomeHeaderComponent'
import { HomeTitle } from '../components/molecules/HomeTitleComponent'
import { NoContents } from '../components/molecules/NoContentsComponent'
import { StuffTalentItem } from '../components/molecules/StuffTalentItemComponent'
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

  useEffect(() => {
    const stufftalentFilter = {
      // TODO: isPublic테스트
      isPublic: false,
      communityId: $community.myCommunity?.id ?? null,
      userId: undefined,
      categories: [],
      notStatuses: [],
      types: [],
      limit: 3,
    }
    $stuff.getItems('', stufftalentFilter)
    $talent.getItems('', stufftalentFilter)
    $club.getPopularClubs(10)
    $club.getPopularClubs(10)
    $feed.getHomeFeeds()
    $feed.getHomeScheduleFeeds()
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
        <FeedSlider items={$feed.homeFeeds}></FeedSlider>

        <div className='px-container'>
          {/* <HomeTitle title='다가오는 일정'></HomeTitle>
          <HomeSchedule items={$feed.homeScheduleFeeds} className='pb-2'></HomeSchedule> */}
          <HomeTitle title='물건창고' route={() => route.stuff()}></HomeTitle>
          <NoContents show={$stuff.items?.length == 0} />
          {$stuff.items.map((item) => (
            <StuffTalentItem
              key={item.id}
              loginUserId={$auth.user.id}
              pageKey={StuffTalentPageKey.STUFF}
              item={item}
            />
          ))}
          <HomeTitle title='재능창고' route={() => route.talent()}></HomeTitle>
          <NoContents show={$talent.items?.length == 0} />
          {$talent.items.map((item) => (
            <StuffTalentItem
              key={item.id}
              loginUserId={$auth.user.id}
              pageKey={StuffTalentPageKey.TALENT}
              item={item}
            />
          ))}
        </div>

        <div className='px-container'>
          <HomeTitle title='소모임' route={() => route.clubs()}></HomeTitle>
        </div>
        <ClubPopularSlider clubs={$club.popularClubs}></ClubPopularSlider>
      </IonContent>
    </IonPage>
  ))
}
