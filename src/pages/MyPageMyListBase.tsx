import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Pad } from '../components/atoms/PadComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FilterBar } from '../components/molecules/FilterBarComponent'
import { FilterPopup } from '../components/molecules/FilterPopupComponent'
import { Segment } from '../components/molecules/SegmentComponent'
import { TaskObserver } from '../components/molecules/TaskObserverComponent'
import { ClubOurTownList } from '../components/organisms/ClubOurTownListComponent'
import { FeedList } from '../components/organisms/FeedListComponent'
import { StuffTalentList } from '../components/organisms/StuffTalentListComponent'
import { useStore } from '../hooks/use-store'
import { Club } from '../models/club'
import { ISegments, SEGMENT_KEYS } from '../models/segment.d'
import { typeLabels } from '../models/stufftalent'
import { IStuffTalentFilter, StuffTalentStatus } from '../models/stufftalent.d'
import { Task } from '../stores/task'

const segments: ISegments = {
  [SEGMENT_KEYS.stuff]: { label: '물건창고' },
  [SEGMENT_KEYS.talent]: { label: '재능창고' },
  [SEGMENT_KEYS.feed]: { label: '이야기창고' },
  [SEGMENT_KEYS.club]: { label: '소모임' },
}

const FilterMode = { none: 'none', type: '거래유형' }
type FilterMode = typeof FilterMode[keyof typeof FilterMode]

export interface IMyPageMyListProps {
  title: string
  initialFilter: IStuffTalentFilter
  selectedSegment: SEGMENT_KEYS
  setSelectedSegment: (segment: SEGMENT_KEYS) => void
  fetchFeeds: Task
  fetchClubs: Task
  clubs: Club[]
}

export const MyPageMyListBase: React.FC<IMyPageMyListProps> = ({
  title,
  initialFilter,
  selectedSegment,
  setSelectedSegment,
  fetchFeeds,
  fetchClubs,
  clubs,
}) => {
  const { $ui, $stuff, $talent } = useStore()

  const onChangeSegment = useCallback(
    (segment: SEGMENT_KEYS) => {
      selectedSegment !== segment && setSelectedSegment(segment)
    },
    [selectedSegment]
  )

  const [filter, setFilter] = useState<IStuffTalentFilter>(initialFilter)
  const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.none)
  const onCloseFilterPopup = () => setFilterMode(FilterMode.none)
  const onResetFilter = () => {
    setFilter(initialFilter)
    setFilterMode(FilterMode.none)
  }

  const isShowFilterBar = useMemo(() => {
    return [SEGMENT_KEYS.stuff, SEGMENT_KEYS.talent].includes(selectedSegment)
  }, [selectedSegment])

  const renderList = useMemo(() => {
    // TODO 오마이갓.. store/fetchTask/clubs => 파라미터를 통일하자
    switch (selectedSegment) {
      case SEGMENT_KEYS.stuff:
        return <StuffTalentList store={$stuff} search={''} filter={filter} />
      case SEGMENT_KEYS.talent:
        return <StuffTalentList store={$talent} search={''} filter={filter} />
      case SEGMENT_KEYS.feed:
        return <FeedList fetchTask={fetchFeeds} />
      case SEGMENT_KEYS.club:
        return (
          <TaskObserver taskTypes={fetchClubs} spinnerPosition='center'>
            {() => <ClubOurTownList clubs={clubs} noContentsFull />}
          </TaskObserver>
        )
      default:
        return <></> // TODO error 발생시켜야 하나?
    }
  }, [selectedSegment, filter, clubs])

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  useEffect(() => {
    onResetFilter()
    selectedSegment === SEGMENT_KEYS.club && fetchClubs()
  }, [selectedSegment])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton type='arrow' />
          </div>
          <IonTitle slot='start'>{title}</IonTitle>
        </IonToolbar>
        <Segment segments={segments} selected={selectedSegment} onChange={onChangeSegment} />
        <div className='px-container mt-1' hidden={!isShowFilterBar}>
          <FilterBar
            filters={[{ name: FilterMode.type, length: filter.types.length + filter.notStatuses.length }]}
            onReset={onResetFilter}
            onClick={(name: string) => {
              setFilterMode(filterMode === name ? FilterMode.none : name)
            }}
          />

          <Pad className='h-3' />
        </div>
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
        <div className='px-container mt-1 mb-4'>{renderList}</div>
      </IonContent>
    </IonPage>
  )
}
