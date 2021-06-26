import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps, useLocation } from 'react-router-dom'
import { Icon } from '../components/atoms/IconComponent'
import { Pad } from '../components/atoms/PadComponent'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { SubmitButton } from '../components/atoms/SubmitButtonComponent'
import { TextSm } from '../components/atoms/TextSmComponent'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { StuffTalentDetailContents } from '../components/molecules/StuffTalentDetailContentsComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'
import { StuffTalentPathName } from '../models/stufftalent.d'
import { route } from '../services/route-service'

export const StuffTalentDetailPage: React.FC<RouteComponentProps<{ id: string }, StaticContext>> = ({
  match,
}) => {
  const id = parseInt(match.params.id)
  const { pathname } = useLocation()

  const { $ui, $stuff, $talent, $auth } = useStore()
  const store = pathname.startsWith('/stuff/') ? $stuff : $talent

  useIonViewWillEnter(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
  })

  useEffect(
    () => {
      store.getItem(id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // TODO ERROR: 수정화면 진입 시, getUpdateForm 안에서 getItem이 호출되는데
  // 이 때문에 unmount된 detail component가 rerender되면서 에러 발생함.
  const onEdit = async (id: number) => {
    await store.getUpdateForm(id)
    pathname === StuffTalentPathName.STUFF ? route.stuffForm() : route.talentForm()
  }

  const onDelete = async (id: number) => {
    await store.deleteItem(id)
    route.goBack()
  }

  return useObserver(() =>
    store.getItem.state === 'pending' ? (
      <Spinner isFull={true} />
    ) : (
      <IonPage>
        <IonContent>
          <BackFloatingButton></BackFloatingButton>
          {/* TODO dont pass store */}
          <StuffTalentDetailContents
            item={store.item}
            loginUserId={$auth.user.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <Pad className='pb-extra-space'></Pad>
        </IonContent>

        <Footer>
          <div className='flex-between-center mx-4'>
            <div
              className='flex-col items-center'
              onClick={async () => {
                await store.toggleLike(id, !store.item.isLike)
              }}
            >
              <Icon name={store.item.isLike ? 'heart-solid' : 'heart'} />
              <TextSm>{store.item.likeCount}</TextSm>
            </div>

            <div className='w-full ml-4'>
              {/* {!store.item?.isMember ? ( // TODO 조건 : chatroomid 있는지 여부
            <SpinnerWrapper
              task={store.createChat}
              Submit={() => (
                <SubmitButton
                  text='채팅으로 거래하기'
                  onClick={() => {
                    // 새채팅 생성하고 해당 채팅룸으로 이동하기
                    // $club.joinClub({ clubId: $club.club.id, userId: $auth.user.id })
                    // TODO: 테스트후 주석 제거
                    // route.chatRoom($club.club.chatroomId)
                  }}
                ></SubmitButton>
              )}
            ></SpinnerWrapper>
          ) : ( */}
              <SubmitButton
                text='채팅으로 거래하기'
                // TODO: set chatRoom Id
                onClick={() => route.chatRoom(1)}
              ></SubmitButton>
              {/* )} */}
            </div>
          </div>
        </Footer>
      </IonPage>
    )
  )
}
