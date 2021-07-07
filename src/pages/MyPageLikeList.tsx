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
import { reaction } from 'mobx'
import { Observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { Pad } from '../components/atoms/PadComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FilterBar } from '../components/molecules/FilterBarComponent'
import { FilterPopup } from '../components/molecules/FilterPopupComponent'
import { Segment } from '../components/molecules/SegmentComponent'
import { FeedList } from '../components/organisms/FeedListComponent'
import { StuffTalentList } from '../components/organisms/StuffTalentListComponent'
import { useStore } from '../hooks/use-store'
import { ISegments, SEGMENT_KEYS } from '../models/segment.d'
import { typeLabels } from '../models/stufftalent'
import { IStuffTalentFilter, StuffTalentStatus } from '../models/stufftalent.d'

/* TODO 내목록 vs 관심목록 - 코드량이 많진 않지만 대부분 중복되는데, 어케 통합할지 각이 안 잡혀서 일단 둔다.
segments : 소모임 OX
$segment.myListSegment vs likeListSegment
initialFilter : userId OX, isLike OX
title : 내 목록 vs 관심 목록
feed fetchTask : getMyFeeds vs getLikeFeeds
club fetchTask : getMyClubs vs undefined
*/

// TODO segment_keys를 stufftalent용으로만 사용하고 있으니, segment.d 파일명을 바꾸던가 해야겠다
const segments: ISegments = {
  [SEGMENT_KEYS.stuff]: { label: '물건창고' },
  [SEGMENT_KEYS.talent]: { label: '재능창고' },
  [SEGMENT_KEYS.feed]: { label: '이야기창고' },
}

const FilterMode = { none: 'none', type: '거래유형' }
type FilterMode = typeof FilterMode[keyof typeof FilterMode]

export const MyPageLikeList: React.FC = () => {
  const { $segment, $stuff, $talent, $feed, $ui } = useStore()

  const title = '관심 목록'
  const segment = useRef<SEGMENT_KEYS>($segment.likeListSegment)
  const setSegment = $segment.setLikeListSegment

  const initialFilter: IStuffTalentFilter = {
    communityId: null,
    userId: undefined,
    isPublic: false,
    categories: [],
    notStatuses: [],
    types: [],
    isLike: true,
    // TODO: 추후 페이징 처리
    limit: 999,
  }
  const [filter, setFilter] = useState<IStuffTalentFilter>(initialFilter)
  const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.none)
  const onCloseFilterPopup = () => setFilterMode(FilterMode.none)
  const onResetFilter = () => {
    setFilter(initialFilter)
    setFilterMode(FilterMode.none)
  }

  const renderList = (segmentKey: SEGMENT_KEYS) => {
    // TODO 오마이갓.. store/fetchTask/clubs => 파라미터를 통일하자
    switch (segmentKey) {
      case SEGMENT_KEYS.stuff:
        return <StuffTalentList store={$stuff} search={''} filter={filter} />
      case SEGMENT_KEYS.talent:
        return <StuffTalentList store={$talent} search={''} filter={filter} />
      case SEGMENT_KEYS.feed:
        return <FeedList fetchTask={$feed.getLikeFeeds} />
      default:
        return <></> // TODO error 발생시켜야 하나?
    }
  }

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  useEffect(() => {
    const disposeReaction = reaction(
      () => $segment.likeListSegment,
      (selectedSegment) => {
        if (segment.current !== selectedSegment) {
          segment.current = selectedSegment
          onResetFilter()
        }
      }
    )

    return () => {
      disposeReaction()
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton type='arrow' />
          </div>
          <IonTitle slot='start'>{title}</IonTitle>
          <IonButtons slot='primary'>
            <IonButton slot='end' color='dark' routerLink='/tabs/my-page/settings'>
              <IonIcon slot='icon-only' icon={filterOutline} size='small' />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <Segment segments={segments} selected={segment.current} setSelected={setSegment} />

        <Observer>
          {() => (
            <div
              className='px-container mt-1'
              hidden={![SEGMENT_KEYS.stuff, SEGMENT_KEYS.talent].includes($segment.likeListSegment)}
            >
              <FilterBar
                filters={[{ name: FilterMode.type, length: filter.types.length + filter.notStatuses.length }]}
                onReset={onResetFilter}
                onClick={(name: string) => {
                  setFilterMode(filterMode === name ? FilterMode.none : name)
                }}
              />

              <Pad className='h-3' />
            </div>
          )}
        </Observer>
      </IonHeader>

      <div className='-mt-3' hidden={filterMode !== FilterMode.type}>
        <FilterPopup
          filterInfos={[
            {
              filter: filter.types,
              items: typeLabels,
              onSelect: (newFilter) => setFilter({ ...filter, types: newFilter }),
            },
            {
              filter: filter.notStatuses,
              items: [{ value: StuffTalentStatus.FINISH, label: '거래완료 안보기' }],
              onSelect: (newFilter) => setFilter({ ...filter, notStatuses: newFilter }),
            },
          ]}
          onClose={onCloseFilterPopup}
        />
      </div>

      <IonContent>
        <div className='px-container mt-1 mb-4'>
          <Observer>{() => renderList($segment.likeListSegment)}</Observer>
        </div>
      </IonContent>
    </IonPage>
  )
}
