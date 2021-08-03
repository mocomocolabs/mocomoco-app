import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '../../components/atoms/IconComponent'
import { Pad } from '../../components/atoms/PadComponent'
import { SubmitButton } from '../../components/atoms/SubmitButtonComponent'
import { TextXs } from '../../components/atoms/TextXsComponent'
import { SpinnerWrapper } from '../../components/helpers/SpinnerWrapper'
import { BackFloatingButton } from '../../components/molecules/BackFloatingButtonComponent'
import { ClubDetailContents } from '../../components/molecules/ClubDetailContentsComponent'
import { ClubDetailMember } from '../../components/molecules/ClubDetailMemberComponent'
import { TaskObserver } from '../../components/molecules/TaskObserverComponent'
import { Footer } from '../../components/organisms/FooterComponent'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'

export const ClubDetailPage: React.FC = () => {
  const id = parseInt(useParams<{ id: string }>().id)
  const { $ui, $club, $auth, $chat } = useStore()

  useEffect(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
    $club.getClub(id)
  }, [])

  return (
    <IonPage>
      <TaskObserver taskTypes={$club.getClub} spinnerPosition='center'>
        {() => (
          <>
            <IonContent>
              <BackFloatingButton />

              <ClubDetailContents club={$club.club} />
              <ClubDetailMember
                members={$club.club.members}
                community={$club.club.community}
                createChat={$chat.createChat}
              />

              <Pad className='pb-extra-space'></Pad>
            </IonContent>
            <Footer>
              <div
                className='flex-col items-center secondary'
                onClick={async () => {
                  await $club.toggleLike(id, !$club.club.isLike)
                }}
              >
                <Icon name={$club.club.isLike ? 'heart-solid' : 'heart'} className='icon-secondary' />
                <TextXs>{$club.club.likeCount}</TextXs>
              </div>

              <div className='w-full ml-4'>
                {!$club.club?.isMember ? (
                  <SpinnerWrapper
                    task={$club.joinClub}
                    spinnerPosition='center'
                    Submit={
                      <SubmitButton
                        text='채팅으로 참여하기'
                        className='h-10'
                        onClick={() => {
                          executeWithError(async () => {
                            await $club.joinClub({ clubId: $club.club.id, userId: $auth.user.id })
                            await $club.getClub(id)
                            $chat.subscribeNewRoom($club.club.chatroomId)
                            route.chatRoom($club.club.chatroomId)
                          })
                        }}
                      />
                    }
                  />
                ) : (
                  <SubmitButton
                    text='채팅방 들어가기'
                    color='secondary'
                    onClick={() => {
                      route.chatRoom($club.club.chatroomId)
                    }}
                  />
                )}
              </div>
            </Footer>
          </>
        )}
      </TaskObserver>
    </IonPage>
  )
}
