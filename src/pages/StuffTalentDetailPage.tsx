import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '../components/atoms/IconComponent'
import { Pad } from '../components/atoms/PadComponent'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { SubmitButton } from '../components/atoms/SubmitButtonComponent'
import { TextXs } from '../components/atoms/TextXsComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { StuffTalentDetailContents } from '../components/molecules/StuffTalentDetailContentsComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'
import { ISubChat } from '../models/chat'
import { getPageKey, routeFunc } from '../models/stufftalent'
import { StuffTalentPageKey } from '../models/stufftalent.d'
import { route } from '../services/route-service'
import { webSocket } from '../services/web-socket-service'

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

  const createChatButton = useMemo(
    () => (
      <SubmitButton
        text='채팅으로 거래하기'
        onClick={async () => {
          // TODO 예외처리: 채팅방 생성 실패하면 에러메시지 띄우기
          await store.createChat({
            [store.predefined.stuffTalentIdProperty]: store.item.id,
          })

          await store.getItem(store.item.id)
          // TODO 채팅방을 생성했으니 getRooms 호출을 해주는 게 맞겠지?
          await $chat.getRooms({ roomIds: [...$chat.rooms.map((room) => room.id), store.item.chatroomId] })

          webSocket.subscribeRoom(store.item.chatroomId, (data) => {
            const subChat = JSON.parse(data.body) as ISubChat
            $chat.setChat(subChat)
            $chat.setLastChatId({
              roomId: subChat.chatroom.id,
              readChatId: subChat.id,
            })
          })

          route.chatRoom(store.item.chatroomId)
        }}
      />
    ),
    [store, $chat]
  )

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
                className='flex-col items-center secondary'
                onClick={async () => {
                  await store.toggleLike(id, !store.item.isLike)
                }}
              >
                <Icon
                  name={store.item.isLike ? 'heart-solid' : 'heart'}
                  className='icon-secondary'
                  size='medium'
                />
                <TextXs>{store.item.likeCount}</TextXs>
              </div>

              <div className='w-full ml-4'>
                {store.item.user.id === $auth.user.id ? (
                  <SubmitButton
                    text='채팅 목록 보기'
                    color='secondary'
                    // TODO 채팅 목록 보기 팝업 구현하기
                    onClick={() => {
                      console.log(
                        '채팅 목록 보기',
                        store.item.stuffUsers?.map((user) => user.chatroom.id)
                      )
                    }}
                  ></SubmitButton>
                ) : !store.item?.chatroomId ? (
                  <SpinnerWrapper task={store.createChat} Submit={() => createChatButton} />
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
