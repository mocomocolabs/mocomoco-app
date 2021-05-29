import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Icon } from '../../components/atoms/IconComponent'
import { TextLg } from '../../components/atoms/TextLgComponent'
import { ClubOurTownList } from '../../components/organisms/ClubOurTownListComponent'
import { ClubPopularSlide } from '../../components/organisms/ClubPopularSlideComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'

export const ClubPage: React.FC = () => {
  const { $ui, $club } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  useEffect(() => {
    $club.getPopularClubs()
    $club.getRecentClubs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useObserver(() => (
    <IonPage>
      <Header>
        <div slot='start' className='text-header'>
          소모임
        </div>
        <div slot='end'>
          <div className='flex'>
            {/* TODO: 추후구현 */}
            {/* <Icon name='search' className='icon-24'></Icon> */}
            <div onClick={() => route.clubForm()}>
              <Icon name='pencil' className='ml-4 icon-24'></Icon>
            </div>
          </div>
        </div>
      </Header>
      <IonContent>
        <TextLg className='px-container mt-5 mb-4 text-bold'>인기 소모임</TextLg>
        <ClubPopularSlide clubs={$club.popularClubs}></ClubPopularSlide>
        <div className='mt-5 px-container'>
          <TextLg className='mb-4 text-bold'>우리동네 소모임</TextLg>
          <ClubOurTownList clubs={$club.recentClubs}></ClubOurTownList>
        </div>
      </IonContent>
    </IonPage>
  ))
}
