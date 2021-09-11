import { IonContent, IonPage } from '@ionic/react'
import { reaction } from 'mobx'
import { Observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import { Icon } from '../components/atoms/IconComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { Segment } from '../components/molecules/SegmentComponent'
import { FeedList } from '../components/organisms/FeedListComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { ISegments, SEGMENT_KEYS } from '../models/segment.d'
import { IRouteParam, route } from '../services/route-service'
import { allCommunity } from '../stores/community-store'

const segments: ISegments = {
  [SEGMENT_KEYS.feed]: { label: '모든 글' },
  [SEGMENT_KEYS.schedule]: { label: '일정' },
}

export const FeedPage: React.FC = () => {
  const segment = useHistory<IRouteParam>().location.state?.segment
  const initSegment = segment ?? SEGMENT_KEYS.feed

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

  const [selectedSegment, setSelectedSegment] = useState<SEGMENT_KEYS>(initSegment)

  const onChangeSegment = useCallback(
    (segment: SEGMENT_KEYS) => {
      selectedSegment !== segment && setSelectedSegment(segment)
    },
    [selectedSegment]
  )

  const renderList = useMemo(
    () => <FeedList fetchTask={$feed.getFeeds} segment={selectedSegment} />,
    [selectedSegment]
  )

  return (
    <IonPage>
      <Header
        start={<CommunitySelector />}
        end={
          <Observer>
            {() => (
              <div
                hidden={![$community.myCommunity, allCommunity].includes($community.community)}
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
                        $feed.setForm({ isPublic: $community.community === allCommunity })
                        route.feedForm()
                      },
                    })
                  }

                  $feed.setForm({ isPublic: $community.community === allCommunity })
                  route.feedForm()
                }}
              >
                <Icon name='pencil'></Icon>
              </div>
            )}
          </Observer>
        }
        bottom={<Segment segments={segments} selected={selectedSegment} onChange={onChangeSegment} />}
      />

      <IonContent>{renderList}</IonContent>
    </IonPage>
  )
}
