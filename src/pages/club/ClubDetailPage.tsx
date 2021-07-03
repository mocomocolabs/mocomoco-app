import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Pad } from '../../components/atoms/PadComponent'
import { Spinner } from '../../components/atoms/SpinnerComponent'
import { SubmitButton } from '../../components/atoms/SubmitButtonComponent'
import { SpinnerWrapper } from '../../components/helpers/SpinnerWrapper'
import { BackFloatingButton } from '../../components/molecules/BackFloatingButtonComponent'
import { ClubDetailContents } from '../../components/molecules/ClubDetailContentsComponent'
import { ClubDetailMember } from '../../components/molecules/ClubDetailMemberComponent'
import { Footer } from '../../components/organisms/FooterComponent'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'

export const ClubDetailPage: React.FC<RouteComponentProps<{ id: string }, StaticContext>> = ({ match }) => {
  const id = parseInt(match.params.id)
  const { $ui, $club, $auth } = useStore()

  useIonViewWillEnter(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
  })

  useEffect(() => {
    $club.getClub(id)
  }, [])

  return useObserver(() => (
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
      <Footer>
        <div className='mx-5'>
          {!$club.club?.isMember ? (
            <SpinnerWrapper
              task={$club.joinClub}
              Submit={() => (
                <SubmitButton
                  text='소모임 참여하기'
                  className='h-10'
                  onClick={() => {
                    $club.joinClub({ clubId: $club.club.id, userId: $auth.user.id })
                    // TODO: 테스트후 주석 제거
                    // route.chatRoom($club.club.chatroomId)
                  }}
                ></SubmitButton>
              )}
            ></SpinnerWrapper>
          ) : (
            <SubmitButton
              text='채팅 참여하기'
              className='bg-m-secondary'
              // TODO: set chatRoom Id
              onClick={() => route.chatRoom(1)}
            ></SubmitButton>
          )}
        </div>
      </Footer>
    </IonPage>
  ))
}
