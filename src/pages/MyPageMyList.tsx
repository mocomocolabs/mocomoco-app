import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { filterOutline } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { Segment } from '../components/molecules/SegmentComponent'
import { ClubOurTownList } from '../components/organisms/ClubOurTownListComponent'
import { FeedList } from '../components/organisms/FeedListComponent'
import { StuffTalentList } from '../components/organisms/StuffTalentListComponent'
import { useStore } from '../hooks/use-store'
import { ISegments, SEGMENT_KEYS } from '../models/segment.d'
import { IStuffTalentFilter } from '../models/stufftalent'

// const FilterMode = { none: 'none', category: 'category', status: 'status' }
// type FilterMode = typeof FilterMode[keyof typeof FilterMode]
const initialFilter: IStuffTalentFilter = {
  isPublic: false,
  communityId: undefined,
  userId: undefined,
  categories: [],
  statuses: [],
  types: [],
}

export const MyPageMyList: React.FC = () => {
  const { $segment, $auth, $stuff, $talent, $feed, $club } = useStore()

  // TODO segment_keys를 stufftalent용으로만 사용하고 있으니, segment.d 파일명을 바꾸던가 해야겠다
  const segments: ISegments = {
    [SEGMENT_KEYS.stuff]: { label: '물건창고' },
    [SEGMENT_KEYS.talent]: { label: '재능창고' },
    [SEGMENT_KEYS.feed]: { label: '이야기창고' },
    [SEGMENT_KEYS.club]: { label: '소모임' },
  }

  useEffect(() => {
    // TODO clublistcomponent 안으로 옮길지 고민해보자
    $segment.mylistSegment === SEGMENT_KEYS.club && $club.getMyClubs()
  }, [$segment.mylistSegment])

  // TODO const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.none)
  const [filter, setFilter] = useState<IStuffTalentFilter>({
    ...initialFilter,
    userId: $auth.user.id,
  })

  const renderList = (segmentKey: SEGMENT_KEYS) => {
    // TODO 오마이갓.. store/fetchTask/clubs => 파라미터를 통일하자
    switch (segmentKey) {
      case SEGMENT_KEYS.stuff:
        return <StuffTalentList store={$stuff} search={''} filter={filter} />
      case SEGMENT_KEYS.talent:
        return <StuffTalentList store={$talent} search={''} filter={filter} />
      case SEGMENT_KEYS.feed:
        return <FeedList fetchTask={$feed.getMyFeeds} />
      case SEGMENT_KEYS.club:
        return <ClubOurTownList clubs={$club.myClubs} />
      default:
        return <></> // TODO error 발생시켜야 하나?
    }
  }

  return useObserver(() => (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton type='arrow' />
          </div>
          <IonTitle slot='start'>내 목록</IonTitle>
          <IonButtons slot='primary'>
            {/* // TODO filter : 이야기창고, 소모임은 필터 없음*/}
            <IonButton slot='end' color='dark' routerLink='/settings'>
              <IonIcon slot='icon-only' icon={filterOutline} size='small' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <Segment
        segments={segments}
        selected={$segment.mylistSegment}
        setSelected={$segment.setMyListSegment}
      />

      <IonContent>
        <div className='px-container my-4'>{renderList($segment.mylistSegment)}</div>
      </IonContent>
    </IonPage>
  ))
}
