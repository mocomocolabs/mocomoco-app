import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Icon } from '../components/atoms/IconComponent'
import { Pad } from '../components/atoms/PadComponent'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { SubmitButton } from '../components/atoms/SubmitButtonComponent'
import { TextSm } from '../components/atoms/TextSmComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { StuffTalentDetailContents } from '../components/molecules/StuffTalentDetailContentsComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'
import { getPageKey, routeFunc } from '../models/stufftalent'
import { StuffTalentPageKey } from '../models/stufftalent.d'
import { route } from '../services/route-service'

export const StuffTalentDetailPage: React.FC<RouteComponentProps<{ id: string }, StaticContext>> = ({
  match,
}) => {
  const id = parseInt(match.params.id)
  const { $ui, $stuff, $talent, $auth } = useStore()

  const pageData = {
    [StuffTalentPageKey.STUFF]: { store: $stuff },
    [StuffTalentPageKey.TALENT]: { store: $talent },
  }

  const { store } = pageData[getPageKey(match.path)]
  const { routeForm } = routeFunc[store.predefined.pageKey]

  useIonViewWillEnter(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
  })

  useEffect(() => {
    store.getItem(id)
  }, [])

  // TODO ERROR: 수정화면 진입 시, getUpdateForm 안에서 getItem이 호출되는데
  // 이 때문에 unmount된 detail component가 rerender되면서 에러 발생함.
  const onEdit = async (id: number) => {
    await store.getUpdateForm(id)
    routeForm()
  }

  const onDelete = async (id: number) => {
    await store.deleteItem(id)
    route.goBack()
  }

  return useObserver(() =>
    store.getItem.match({
      pending: () => <Spinner isFull={true} />,
      resolved: () => (
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
                {!store.item?.chatroomId ? ( // TODO 조건 : chatroomid 있는지 여부
                  <SpinnerWrapper
                    task={store.createChat}
                    Submit={() => (
                      <SubmitButton
                        text='채팅으로 거래하기'
                        onClick={() => {
                          // TODO 예외처리: 채팅방 생성 실패하면 에러메시지 띄우기
                          store.createChat({
                            [store.predefined.stuffTalentIdProperty]: store.item.id,
                            userId: $auth.user.id,
                          })
                          route.chatRoom(store.item.chatroomId)
                        }}
                      ></SubmitButton>
                    )}
                  ></SpinnerWrapper>
                ) : (
                  <SubmitButton
                    text='채팅으로 거래하기'
                    onClick={() => route.chatRoom(store.item.chatroomId)}
                  ></SubmitButton>
                )}
              </div>
            </div>
          </Footer>
        </IonPage>
      ),
      rejected: () => {
        store.getItem.reset()
        return <></>
      },
    })
  )
}
