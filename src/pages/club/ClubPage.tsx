import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
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

  return (
    <IonPage>
      <Header>
        <div slot='start' className='text-header'>
          소모임
        </div>
        <div slot='end'>
          <div className='flex'>
            <Icon name='search' className='icon-24'></Icon>
            <div onClick={() => route.clubForm()}>
              <Icon name='pencil' className='ml-4 icon-24'></Icon>
            </div>
          </div>
        </div>
      </Header>
      <IonContent>
        <TextLg className='px-container mt-5 mb-4 text-bold'>인기 소모임</TextLg>
        <ClubPopularSlide></ClubPopularSlide>
        <div className='mt-5 px-container'>
          <TextLg className='mb-4 text-bold'>우리동네 소모임</TextLg>
          <ClubOurTownList></ClubOurTownList>
        </div>
      </IonContent>
    </IonPage>
  )
}
