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
import { FilterPopup } from '../components/molecules/FilterPopupComponent'
import { StuffTalentList } from '../components/organisms/StuffTalentListComponent'
import { useStore } from '../hooks/use-store'
import { IStuffTalentFilter } from '../models/stufftalent.d'

interface SearchbarChangeEventDetail {
  value: string | undefined
}

const FilterMode = { none: 'none', category: 'category', status: 'status', type: 'type' }
type FilterMode = typeof FilterMode[keyof typeof FilterMode]

const initialSearch = ''
const initialFilter: IStuffTalentFilter = {
  isPublic: false,
  communityId: undefined,
  userId: undefined,
  categories: [],
  statuses: [],
  types: [],
}

export const StuffTalentPage: React.FC = () => {
  const { $stuff, $talent, $ui, $community } = useStore()
  const { pathname } = useLocation()

  // TODO 경로명 하드코딩하지 않기
  const store = pathname === '/stuff' ? $stuff : $talent

  const [searchMode, setSearchMode] = useState(false)
  const [search, setSearch] = useState(initialSearch)
  const onSearchSubmit = (e: CustomEvent<SearchbarChangeEventDetail>) => setSearch(e.detail.value!)

  const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.none)
  const [filter, setFilter] = useState<IStuffTalentFilter>({
    ...initialFilter,
    communityId: $community.selectedId,
  })

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  useEffect(() => {
    const disposeReaction = reaction(
      () => $community.selectedId,
      (selectedId) => {
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
          {/* TODO extract as component */}
          <div className='flex justify-around'>
            <div
              hidden={
                filter.categories.length === 0 && filter.statuses.length === 0 && filter.types.length === 0
              }
              onClick={() => {
                setFilter(initialFilter)
                setFilterMode(FilterMode.none)
              }}
            >
              초기화
            </div>
            <div
              className={filter.categories.length > 0 ? 'bg-yellow' : ''}
              onClick={() => {
                setFilterMode(filterMode === FilterMode.category ? FilterMode.none : FilterMode.category)
              }}
            >
              ▼카테고리
            </div>
            <div
              className={filter.statuses.length > 0 ? 'bg-yellow' : ''}
              onClick={() => {
                setFilterMode(filterMode === FilterMode.status ? FilterMode.none : FilterMode.status)
              }}
            >
              ▼거래상태
            </div>
            <div
              className={filter.types.length > 0 ? 'bg-yellow' : ''}
              onClick={() => {
                setFilterMode(filterMode === FilterMode.type ? FilterMode.none : FilterMode.type)
              }}
            >
              ▼유형
            </div>
          </div>
        </div>
      </IonHeader>

      <IonContent>
        {/* TODO 팝업영역을 일괄 추출할 수 있을까? */}
        {/* TODO setFilter할 때 categories: 적는 것도 빼고 싶다 */}
        {/* TODO print 에서 number 빼고 싶다 */}
        <div className='justify-around' hidden={filterMode !== FilterMode.category}>
          <FilterPopup
            filter={filter.categories}
            items={store.categories.map((c) => c.id)}
            print={(id: number) => store.categories.find((c) => c.id === id)!.name}
            onSelect={(newFilter: typeof filter.categories) =>
              setFilter({ ...filter, categories: newFilter })
            }
            onClose={() => setFilterMode(FilterMode.none)}
          />
        </div>

        <div className='justify-around' hidden={filterMode !== FilterMode.status}>
          <FilterPopup
            filter={filter.statuses}
            items={store.statuses}
            onSelect={(newFilter: typeof filter.statuses) => setFilter({ ...filter, statuses: newFilter })}
            onClose={() => setFilterMode(FilterMode.none)}
          />
        </div>

        <div className='justify-around' hidden={filterMode !== FilterMode.type}>
          <FilterPopup
            filter={filter.types}
            items={store.types}
            onSelect={(newFilter: typeof filter.types) => setFilter({ ...filter, types: newFilter })}
            onClose={() => setFilterMode(FilterMode.none)}
          />
        </div>

        <div className='px-container'>
          <StuffTalentList store={store} search={search} filter={filter} />
        </div>
      </IonContent>
    </IonPage>
  )
}
