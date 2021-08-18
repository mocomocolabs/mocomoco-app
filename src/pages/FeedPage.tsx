import { IonContent, IonPage } from '@ionic/react'
import { reaction } from 'mobx'
import { useEffect } from 'react'
import { Icon } from '../components/atoms/IconComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { FeedList } from '../components/organisms/FeedListComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'

export const FeedPage: React.FC = () => {
  const { $ui, $feed, $community } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  useEffect(() => {
    const disposeReaction = reaction(
      () => $community.selectedId,
      () => {
        $feed.getFeeds()
      }
    )

    return () => disposeReaction()
  }, [])

  return (
    <IonPage>
      <Header
        start={<CommunitySelector />}
        end={
          /* TODO: 본인의 커뮤니티에서만 글을 쓸 수 있어야함 */
          <div
            onClick={() => {
              const isWriting =
                $feed.form.title || $feed.form.content || $feed.form.images?.length || $feed.form.schedule

              if (isWriting) {
                return $ui.showAlert({
                  message: '작성하던 글이 있어요. 이어서 작성하시겠어요?',
                  onSuccess() {
                    route.feedForm()
                  },
                  onFail() {
                    $feed.resetForm()
                    route.feedForm()
                  },
                })
              }
              route.feedForm()
            }}
          >
            <Icon name='pencil'></Icon>
          </div>
        }
      />

      <IonContent>
        <FeedList fetchTask={$feed.getFeeds} />
      </IonContent>
    </IonPage>
  )
}
