import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { FeedSlider } from '../components/molecules/FeedSliderComponent'
import { HomeHeader } from '../components/molecules/HomeHeaderComponent'
import { HomeSchedule } from '../components/molecules/HomeScheduleComponent'
import { HomeTitle } from '../components/molecules/HomeTitleComponent'
import { StuffTalentItem } from '../components/molecules/StuffTalentItemComponent'
import { ClubPopularSlider } from '../components/organisms/ClubPopularSliderComponent'
import { useStore } from '../hooks/use-store'
import { StuffTalentPathName } from '../models/stufftalent.d'
import { route } from '../services/route-service'

export const HomePage: React.FC = () => {
  const { $ui, $community, $auth, $feed, $stuff, $talent, $club } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  useEffect(() => {
    const stufftalentFilter = {
      // TODO: isPublic테스트
      isPublic: false,
      communityId: $community.myCommunity?.id,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TODO: loader compositie or height fixed

  return useObserver(() => (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <HomeHeader
            name={$community.myCommunity?.name}
            count={$community.myCommunity?.userCount}
          ></HomeHeader>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <HomeTitle title='이야기 창고' route={() => route.feed()}></HomeTitle>
        </div>
        <FeedSlider items={$feed.homeFeeds}></FeedSlider>

        <div className='px-container'>
          <HomeTitle title='다가오는 일정'></HomeTitle>
          <HomeSchedule items={$feed.homeScheduleFeeds} className='pb-2'></HomeSchedule>
          <HomeTitle title='물건 창고' route={() => route.stuff()}></HomeTitle>
          {$stuff.items.map((item) => (
            <StuffTalentItem
              key={item.id}
              loginUserId={$auth.user.id}
              path={StuffTalentPathName.STUFF}
              item={item}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
          <HomeTitle title='재능 창고' route={route.talent}></HomeTitle>
          {$talent.items.map((item) => (
            <StuffTalentItem
              key={item.id}
              loginUserId={$auth.user.id}
              path={StuffTalentPathName.STUFF}
              item={item}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>

        <div className='px-container'>
          <HomeTitle title='소모임' route={route.clubs}></HomeTitle>
        </div>
        <ClubPopularSlider clubs={$club.popularClubs}></ClubPopularSlider>
      </IonContent>
    </IonPage>
  ))
}
