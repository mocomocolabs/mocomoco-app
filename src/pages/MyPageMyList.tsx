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
import React, { useEffect, useState } from 'react'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { Segment } from '../components/molecules/SegmentComponent'
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
  const { $auth, $stuff, $talent, $feed, $club } = useStore()

  const segments: ISegments = {
    [SEGMENT_KEYS.stuff]: { label: '물건창고', store: $stuff },
    [SEGMENT_KEYS.talent]: { label: '재능창고', store: $talent },
    [SEGMENT_KEYS.feed]: { label: '이야기창고', store: $feed },
    [SEGMENT_KEYS.club]: { label: '소모임', store: $club },
  }

  const [selectedSegmentKey, setSelectedSegmentKey] = useState(SEGMENT_KEYS.stuff)

  const store = $stuff //storeGetter[selectedSegment]

  useEffect(() => {
    console.log(selectedSegmentKey)
  }, [selectedSegmentKey])

  // segment에 따른 변동부
  // 1. filter component
  // const getFilterComponent

  // 2. list component : props={store, search, filter, 흠...}

  // TODO const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.none)
  const [filter, setFilter] = useState<IStuffTalentFilter>({
    ...initialFilter,
    userId: $auth.user.id,
  })

  return (
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

      <Segment segments={segments} selected={selectedSegmentKey} setSelected={setSelectedSegmentKey} />

      <IonContent>
        <div className='px-container my-4'>
          {/* segment에 따라 여기 내용이 바뀜 */}
          <StuffTalentList store={store} search={''} filter={filter} />
        </div>
      </IonContent>
    </IonPage>
  )
}
