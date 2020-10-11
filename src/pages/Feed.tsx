import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { create } from 'ionicons/icons'
import * as _ from 'lodash'
import React from 'react'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { CommunityBanner } from '../components/organisms/CommunityBannerComponent'
import { FeedList } from '../components/organisms/FeedListComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../route'
import { removeUndefined } from '../utils/object-util'

export const Feed: React.FC = () => {
  const { $ui, $feed } = useStore()

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
              if (!_.isEmpty(removeUndefined($feed.form))) {
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
          <CommunityBanner></CommunityBanner>
          <FeedList />
        </div>
      </IonContent>
    </IonPage>
  )
}
