import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FeedForm } from '../components/organisms/FeedFormComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'
import { executeWithError } from '../utils/http-helper-util'

export interface IFeedWrite {}

export const FeedWritePage: FC<IFeedWrite> = () => {
  const { $ui, $feed, $community } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
  })

  return useObserver(() => {
    // TODO : 아래 로그를 찍어주어야, SubmitBtn의 $feed가 갱신됌
    console.log($feed.form.content)

    const SubmitBtn = () => (
      <div
        className={$feed.form.content ? '' : 'gray'}
        slot='end'
        onClick={() =>
          $feed.form.content &&
          executeWithError(async () => {
            await $feed.insertFeed({
              ...$feed.form,
              communityId: $community.selectedId,
            })
            route.feed()
          })
        }
      >
        완료
      </div>
    )

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div slot='start'>
              <BackButton type='close'></BackButton>
            </div>
            <div slot='end'>
              <SpinnerWrapper task={$feed.insertFeed} Submit={SubmitBtn}></SpinnerWrapper>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className='px-container'>
            <FeedForm></FeedForm>
          </div>
        </IonContent>
      </IonPage>
    )
  })
}
