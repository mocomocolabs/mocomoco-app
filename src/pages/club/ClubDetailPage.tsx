import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'

export const ClubDetailPage: React.FC = () => {
  const { $ui, $club } = useStore()

  useIonViewWillEnter(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
  })

  return (
    <IonPage>
      <Header>
        <BackButton></BackButton>
        {/* <div slot='start' className='text-header'></div> */}
      </Header>
      <IonContent>
        {/* <TextLg className='px-container mt-5 mb-4 text-bold'>인기 소모임</TextLg>
        <ClubPopularSlide></ClubPopularSlide>
        <div className='mt-5 px-container'>
          <TextLg className='mb-4 text-bold'>우리동네 소모임</TextLg>
          <ClubOurTownList></ClubOurTownList>
        </div> */}
      </IonContent>
    </IonPage>
  )
}
