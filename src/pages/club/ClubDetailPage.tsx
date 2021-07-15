import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '../../components/atoms/IconComponent'
import { Pad } from '../../components/atoms/PadComponent'
import { Spinner } from '../../components/atoms/SpinnerComponent'
import { SubmitButton } from '../../components/atoms/SubmitButtonComponent'
import { TextXs } from '../../components/atoms/TextXsComponent'
import { SpinnerWrapper } from '../../components/helpers/SpinnerWrapper'
import { BackFloatingButton } from '../../components/molecules/BackFloatingButtonComponent'
import { ClubDetailContents } from '../../components/molecules/ClubDetailContentsComponent'
import { ClubDetailMember } from '../../components/molecules/ClubDetailMemberComponent'
import { Footer } from '../../components/organisms/FooterComponent'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'

export const ClubDetailPage: React.FC = () => {
  const id = parseInt(useParams<{ id: string }>().id)
  const { $ui, $club, $auth } = useStore()

  useEffect(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
    $club.getClub(id)
  }, [])

  return useObserver(() =>
    $club.getClub.match({
      pending: () => <Spinner isFull={true} />,
      resolved: () => (
        <IonPage>
          <IonContent>
            <BackFloatingButton></BackFloatingButton>

            <ClubDetailContents club={$club.club}></ClubDetailContents>
            <ClubDetailMember
              members={$club.club.members}
              community={$club.club.community}
            ></ClubDetailMember>

            <Pad className='pb-extra-space'></Pad>
          </IonContent>
          <Footer>
            <div className='flex-between-center mx-4'>
              <div
                className='flex-col items-center secondary'
                onClick={async () => {
                  await $club.toggleLike(id, !$club.club.isLike)
                }}
              >
                <Icon
                  name={$club.club.isLike ? 'heart-solid' : 'heart'}
                  className='icon-secondary'
                  size='medium'
                />
                <TextXs>{$club.club.likeCount}</TextXs>
              </div>

              <div className='w-full ml-4'>
                {!$club.club?.isMember ? (
                  <SpinnerWrapper
                    task={$club.joinClub}
                    Submit={
                      <SubmitButton
                        text='소모임 참여하기'
                        className='h-10'
                        onClick={() => {
                          $club.joinClub({ clubId: $club.club.id, userId: $auth.user.id })
                          // TODO: 테스트후 주석 제거
                          // route.chatRoom($club.club.chatroomId)
                        }}
                      ></SubmitButton>
                    }
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
            </div>
          </Footer>
        </IonPage>
      ),
    })
  )
}
