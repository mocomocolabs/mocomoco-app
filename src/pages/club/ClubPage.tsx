import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import { Icon } from '../../components/atoms/IconComponent'
import { TextLg } from '../../components/atoms/TextLgComponent'
import { CommunitySelector } from '../../components/molecules/CommunitySelectorComponent'
import { TaskObserver } from '../../components/molecules/TaskObserverComponent'
import { ClubOurTownList } from '../../components/organisms/ClubOurTownListComponent'
import { ClubPopularSlider } from '../../components/organisms/ClubPopularSliderComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'

export const ClubPage: React.FC = () => {
  const { $ui, $club, $community } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  useEffect(() => {
    $club.getPopularClubs(999)
    $club.getRecentClubs()
  }, [])

  return (
    <IonPage>
      <Header>
        <div slot='start'>
          <CommunitySelector name={$community.myCommunity?.name} disabled />
        </div>
        <div slot='end'>
          <div className='flex'>
            {/* TODO: 추후구현 */}
            {/* <Icon name='search' /> */}
            <div onClick={() => route.clubForm()}>
              <Icon name='pencil' className='ml-4' />
            </div>
          </div>
        </div>
      </Header>
      <IonContent>
        <TextLg className='px-container mt-5 mb-4 text-bold'>인기 소모임</TextLg>
        <TaskObserver taskTypes={$club.getPopularClubs} spinnerPosition='centerX'>
          {() => <ClubPopularSlider clubs={$club.popularClubs} />}
        </TaskObserver>
        <div className='mt-5 px-container'>
          <TextLg className='mb-4 text-bold'>우리동네 소모임</TextLg>
          <TaskObserver taskTypes={$club.getRecentClubs} spinnerPosition='centerX'>
            {() => <ClubOurTownList clubs={$club.recentClubs} />}
          </TaskObserver>
        </div>
      </IonContent>
    </IonPage>
  )
}
