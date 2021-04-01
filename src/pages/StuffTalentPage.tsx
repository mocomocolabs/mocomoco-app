import {
  IonBackdrop,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react'
import { create, filter as filterIcon, search as searchIcon } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { StuffTalentList } from '../components/organisms/StuffTalentListComponent'
import { useStore } from '../hooks/use-store'
import { IStuffTalentFilter } from '../models/stufftalent.d'

interface SearchbarChangeEventDetail {
  value: string | undefined
}

const FilterMode = { none: 'none', category: 'category', status: 'status' }
type FilterMode = typeof FilterMode[keyof typeof FilterMode]

const initialSearch = ''
const initialFilter: IStuffTalentFilter = { categories: [], statuses: [] }

export const StuffTalentPage: React.FC = () => {
  const { $stuff, $talent, $ui } = useStore()
  const { pathname } = useLocation()
  const store = pathname === '/stuff' ? $stuff : $talent

  const [searchMode, setSearchMode] = useState(false)
  const [search, setSearch] = useState(initialSearch)
  const onSearchSubmit = (e: CustomEvent<SearchbarChangeEventDetail>) => setSearch(e.detail.value!)

  const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.none)
  const [filter, setFilter] = useState<IStuffTalentFilter>(initialFilter)

  useEffect(() => {
    !searchMode && setSearch(initialSearch)
  }, [searchMode])

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

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
              hidden={filter.categories.length === 0 && filter.statuses.length === 0}
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
          </div>
        </div>
      </IonHeader>

      <IonContent>
        {/* TODO extract as component */}
        <div className='justify-around' hidden={filterMode !== FilterMode.category}>
          <div className='absolute z-10 w-full bg-white'>
            {store.categories
              .sort((a, b) => (a.name <= b.name ? -1 : 1))
              .map((category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    const categories = filter.categories.includes(category.id)
                      ? filter.categories.filter((v) => v !== category.id)
                      : filter.categories.concat(category.id)

                    setFilter({ ...filter, categories })
                  }}
                >
                  {category.name}
                  {filter.categories.includes(category.id) ? ' V' : ''}
                </div>
              ))}
          </div>
          <IonBackdrop
            onIonBackdropTap={() => {
              setFilterMode(FilterMode.none)
            }}
          />
        </div>

        <div className='justify-around' hidden={filterMode !== FilterMode.status}>
          <div className='absolute z-10 w-full bg-white'>
            {store.status.map((status) => (
              <div
                key={status}
                onClick={() => {
                  const statuses = filter.statuses.includes(status)
                    ? filter.statuses.filter((v) => v !== status)
                    : filter.statuses.concat(status)

                  setFilter({ ...filter, statuses })
                }}
              >
                {status}
                {filter.statuses.includes(status) ? ' V' : ''}
              </div>
            ))}
          </div>
          <IonBackdrop
            onIonBackdropTap={() => {
              setFilterMode(FilterMode.none)
            }}
          />
        </div>

        <div className='px-container'>
          <StuffTalentList store={store} search={search} filter={filter} />
        </div>
      </IonContent>
    </IonPage>
  )
}
