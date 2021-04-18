import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Pad } from '../../components/atoms/PadComponent'
import { Spinner } from '../../components/atoms/SpinnerComponent'
import { BackFloatingButton } from '../../components/molecules/BackFloatingButtonComponent'
import { ClubDetailContents } from '../../components/molecules/ClubDetailContentsComponent'
import { ClubDetailMember } from '../../components/molecules/ClubDetailMemberComponent'
import { useStore } from '../../hooks/use-store'

export const ClubDetailPage: React.FC<RouteComponentProps<{ id: string }, StaticContext>> = () => {
  const { $ui, $club } = useStore()

  useIonViewWillEnter(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
  })

  useEffect(() => {
    $club.getClub(1)
  }, [])

  return (
    <IonPage>
      <IonContent>
        <BackFloatingButton></BackFloatingButton>

        {$club.club ? (
          <>
            <ClubDetailContents club={$club.club}></ClubDetailContents>
            <ClubDetailMember
              members={$club.club.members}
              community={$club.club.community}
            ></ClubDetailMember>
          </>
        ) : (
          <Spinner></Spinner>
        )}

        <Pad className='pb-extra-space'></Pad>
      </IonContent>
    </IonPage>
  )
}
