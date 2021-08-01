import { IonContent, IonPage } from '@ionic/react'
import _ from 'lodash'
import { when } from 'mobx'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '../components/atoms/IconComponent'
import { Pad } from '../components/atoms/PadComponent'
import { SubmitButton } from '../components/atoms/SubmitButtonComponent'
import { TextSm } from '../components/atoms/TextSmComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { BottomPopup } from '../components/molecules/BottomPopupComponent'
import { ChatRoomListItem } from '../components/molecules/ChatRoomListItemComponent'
import { StuffTalentDetailContents } from '../components/molecules/StuffTalentDetailContentsComponent'
import { TaskObserver } from '../components/molecules/TaskObserverComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'
import { getPageKey, routeFunc } from '../models/stufftalent'
import { IStuffTalent, StuffTalentPageKey, StuffTalentStatus } from '../models/stufftalent.d'
import { route } from '../services/route-service'
import { IStuffTalentLikeUserDto } from '../stores/stufftalent-store.d'

export const StuffTalentDetailPage: React.FC = () => {
  const id = parseInt(useParams<{ id: string }>().id)

  const { $ui, $stuff, $talent, $auth, $chat } = useStore()

  const pageData = {
    [StuffTalentPageKey.STUFF]: { store: $stuff },
    [StuffTalentPageKey.TALENT]: { store: $talent },
  }

  const { store } = pageData[getPageKey(location.pathname)]
  const { routeForm } = routeFunc[store.predefined.pageKey]

  useEffect(() => {
    // TODO: statusbar 투명 체크
    $ui.setIsBottomTab(false)
  }, [])

  useEffect(() => {
    store.getItem(id)
  }, [])

  const [showChatList, setShowChatList] = useState(false)
  const [chatList, setChatList] = useState<ReactNode>()

  useEffect(() => {
    const dispose = when(
      () => store.getItem.state === 'resolved' && store.item?.user?.id === $auth.user.id,
      () => {
        const _chatList = (
          store.item[
            store.predefined.stuffTalentUsersProperty as keyof IStuffTalent
          ] as IStuffTalentLikeUserDto[]
        )?.map((user, index) => user.chatroom && <ChatRoomListItem key={index} room={user.chatroom} />)

        _chatList && setChatList(_chatList)
      }
    )

    return () => dispose()
  }, [])

  const createChatButton = useCallback(
    () => (
      <SubmitButton
        text='채팅으로 거래하기'
        disabled={store.item.status === StuffTalentStatus.FINISH}
        onClick={async () => {
          // TODO 예외처리: 채팅방 생성 실패하면 에러메시지 띄우기
          await store.createChat({
            [store.predefined.stuffTalentIdProperty]: store.item.id,
          })

          await store.getItem(store.item.id)

          $chat.subscribeNewRoom(store.item.chatroomId)

          route.chatRoom(store.item.chatroomId)
        }}
      />
    ),
    []
  )

  const onEdit = async (id: number) => {
    await store.getUpdateForm(id)
    routeForm()
  }

  const onDelete = async (id: number) => {
    await store.deleteItem(id)
    route.goBack()
  }

  const onUpdateStatus = async (id: number, status: StuffTalentStatus) => {
    await store.updateItemStatus(id, status)
    await store.getItem(id)
  }

  return (
    <IonPage>
      <TaskObserver taskTypes={store.getItem} spinnerPosition='center'>
        {() => (
          <>
            <IonContent>
              <BackFloatingButton />
              {/* TODO dont pass store */}
              <StuffTalentDetailContents
                item={store.item}
                loginUserId={$auth.user.id}
                onEdit={onEdit}
                onDelete={onDelete}
                onUpdateStatus={onUpdateStatus}
              />
              <Pad className='pb-extra-space'></Pad>
            </IonContent>

            <BottomPopup show={showChatList} title='채팅 목록 보기' onClose={() => setShowChatList(false)}>
              {chatList}
            </BottomPopup>

            <Footer>
              <div
                className='flex-col items-center secondary'
                onClick={async () => {
                  await store.toggleLike(id, !store.item.isLike)
                }}
              >
                <Icon name={store.item.isLike ? 'heart-solid' : 'heart'} className='icon-secondary' />
                <TextSm>{store.item.likeCount}</TextSm>
              </div>

              <div className='w-full ml-4'>
                {store.item.user.id === $auth.user.id ? (
                  <SubmitButton
                    text='채팅 목록 보기'
                    color='secondary'
                    disabled={store.item.status === StuffTalentStatus.FINISH}
                    onClick={() => {
                      !!chatList && !_.isEmpty(chatList)
                        ? setShowChatList(!showChatList)
                        : $ui.showToastError({ message: '채팅 목록이 없습니다' })
                    }}
                  />
                ) : !store.item?.chatroomId ? (
                  <SpinnerWrapper task={store.createChat} Submit={createChatButton()} />
                ) : (
                  <SubmitButton
                    text='채팅으로 거래하기'
                    disabled={store.item.status === StuffTalentStatus.FINISH}
                    onClick={() => route.chatRoom(store.item.chatroomId)}
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
