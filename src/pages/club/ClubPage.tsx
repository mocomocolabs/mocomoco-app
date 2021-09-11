import { IonContent, IonPage } from '@ionic/react'
import { Observer } from 'mobx-react-lite'
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
import { allCommunity } from '../../stores/community-store'

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
      <Header
        start={<CommunitySelector name={$community.myCommunity?.name} disabled />}
        end={
          /* TODO: 추후구현 */
          /* <Icon name='search' /> */
          <Observer>
            {() => (
              <div
                hidden={![$community.myCommunity, allCommunity].includes($community.community)}
                onClick={() => {
                  const isWriting = $club.form.name || $club.form.description || $club.form.images?.length

                  if (isWriting) {
                    return $ui.showAlert({
                      message: '작성하던 글이 있어요. 이어서 작성하시겠어요?',
                      onSuccess() {
                        route.clubForm()
                      },
                      onFail() {
                        $club.resetForm()
                        $club.setForm({ isPublic: $community.community === allCommunity })
                        route.clubForm()
                      },
                    })
                  }

                  $club.setForm({ isPublic: $community.community === allCommunity })

                  route.clubForm()
                }}
              >
                <Icon name='pencil' />
              </div>
            )}
          </Observer>
        }
      />
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
