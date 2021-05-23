import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { create } from 'ionicons/icons'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { FeedList } from '../components/organisms/FeedListComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'

export const FeedPage: React.FC = () => {
  const { $ui, $feed } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <CommunitySelector></CommunitySelector>
          </div>
          {/* TODO: 본인의 커뮤니티에서만 글을 쓸 수 있어야함 */}
          <div
            slot='end'
            onClick={() => {
              const isWriting =
                $feed.form.title ||
                $feed.form.content ||
                $feed.form.images?.length ||
                $feed.form.scheduleTitle

              if (isWriting) {
                return $ui.showAlert({
                  isOpen: true,
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
            <IonIcon icon={create}></IonIcon>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <FeedList fetchTask={$feed.getFeeds} />
        </div>
      </IonContent>
    </IonPage>
  )
}
