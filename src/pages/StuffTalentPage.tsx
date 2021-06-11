import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react'
import { create, filter as filterIcon, search as searchIcon } from 'ionicons/icons'
import { reaction } from 'mobx'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { FilterBar } from '../components/molecules/FilterBarComponent'
import { FilterPopup } from '../components/molecules/FilterPopupComponent'
import { StuffTalentList } from '../components/organisms/StuffTalentListComponent'
import { useStore } from '../hooks/use-store'
import { IStuffTalentFilter, StuffTalentType } from '../models/stufftalent.d'

interface SearchbarChangeEventDetail {
  value: string | undefined
}

const FilterMode = { none: 'none', category: '카테고리', type: '유형' }
type FilterMode = typeof FilterMode[keyof typeof FilterMode]

const initialSearch = ''

export const StuffTalentPage: React.FC = () => {
  const { $stuff, $talent, $ui, $community } = useStore()
  const { pathname } = useLocation()

  // TODO 경로명 하드코딩하지 않기
  const store = pathname === '/stuff' ? $stuff : $talent

  const [searchMode, setSearchMode] = useState(false)
  const [search, setSearch] = useState(initialSearch)
  const onSearchSubmit = (e: CustomEvent<SearchbarChangeEventDetail>) => setSearch(e.detail.value!)

  const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.none)

  const initialFilter: IStuffTalentFilter = {
    isPublic: false,
    communityId: $community.selectedId,
    userId: undefined,
    categories: [],
    notStatuses: [],
    types: [],
  }
  const [filter, setFilter] = useState<IStuffTalentFilter>(initialFilter)

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  useEffect(() => {
    const disposeReaction = reaction(
      () => $community.selectedId,
      (selectedId) => {
        // TODO 모든 공동체 선택 시 isPublic=true 처리 필요
        console.log('reaction for communityId changed') // TODO reaction 객체가 반복생성되는지 확인하려는 용도. 나중에 삭제예정
        setFilter({ ...filter, communityId: selectedId })
      }
    )

    return () => {
      disposeReaction()
      setFilter(initialFilter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !searchMode && setSearch(initialSearch)

    return function cleanup() {
      setSearch(initialSearch)
    }
  }, [searchMode])

  const onCloseFilterPopup = () => setFilterMode(FilterMode.none)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='flex-between-center' hidden={searchMode}>
            <div slot='start'>
              <CommunitySelector></CommunitySelector>
            </div>
            <div slot='end'>
              <IonIcon icon={filterIcon} size='large' />
              <IonIcon icon={create} size='large' />
              <IonIcon icon={searchIcon} size='large' onClick={() => setSearchMode(true)} />
            </div>
          </div>

          <div className='flex-between-center' hidden={!searchMode}>
            <BackButton type='close' action={() => setSearchMode(false)} />
            <IonSearchbar
              value={search}
              placeholder='검색'
              type='search'
              inputmode='search'
              debounce={500}
              onIonChange={onSearchSubmit}
            />
          </div>
        </IonToolbar>

        <div className='px-container'>
          <FilterBar
            filters={[
              { name: FilterMode.category, length: filter.categories.length },
              { name: FilterMode.type, length: filter.types.length + filter.notStatuses.length },
            ]}
            onReset={() => {
              setFilter(initialFilter)
              setFilterMode(FilterMode.none)
            }}
            onClick={(name: string) => {
              setFilterMode(filterMode === name ? FilterMode.none : name)
            }}
          />
        </div>
      </IonHeader>

      <FilterPopup
        show={filterMode === FilterMode.category}
        filterInfos={[
          {
            filter: filter.categories,
            items: store.categories.map((c) => [c.id, c.name]),
            onSelect: (newFilter) => setFilter({ ...filter, categories: newFilter }),
          },
        ]}
        onClose={onCloseFilterPopup}
      />

      <FilterPopup
        show={filterMode === FilterMode.type}
        filterInfos={[
          {
            filter: filter.types,
            items: [
              [StuffTalentType.GIVE, '팔아요'],
              [StuffTalentType.TAKE, '구해요'],
            ],
            onSelect: (newFilter) => setFilter({ ...filter, types: newFilter }),
          },
          {
            filter: filter.notStatuses,
            items: [['FINISH', '거래완료 안보기']],
            onSelect: (newFilter) => setFilter({ ...filter, notStatuses: newFilter }),
          },
        ]}
        onClose={onCloseFilterPopup}
      />

      <IonContent>
        <div className='px-container'>
          <StuffTalentList store={store} search={search} filter={filter} />
        </div>
      </IonContent>
    </IonPage>
  )
}
