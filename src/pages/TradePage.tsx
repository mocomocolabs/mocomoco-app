import { IonBackdrop, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonToolbar } from '@ionic/react'
import { chevronBack, create, filter as filterIcon, search as searchIcon } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { TradeList } from '../components/organisms/TradeListComponent'
import { useStore } from '../hooks/use-store'
import { IStuffTalentFilter } from '../models/stuff'

interface SearchbarChangeEventDetail {
  value: string | undefined
}

export const TradePage: React.FC = () => {
  const { $stuff, $talent } = useStore()
  const { pathname } = useLocation()
  const store = pathname === '/stuff' ? $stuff : $talent

  const [searchMode, setSearchMode] = useState(false)

  const initialSearch = ''
  const [search, setSearch] = useState(initialSearch)
  const onSearchSubmit = (e: CustomEvent<SearchbarChangeEventDetail>) => setSearch(e.detail.value!)

  const FilterPopup = { none: 'none', category: 'category', status: 'status' }
  type FilterPopup = typeof FilterPopup[keyof typeof FilterPopup]
  const [filterMode, setFilterMode] = useState<FilterPopup>(FilterPopup.none)

  const initialFilter: IStuffTalentFilter = { category: [], status: [] }
  const [filter, setFilter] = useState<IStuffTalentFilter>(initialFilter)

  useEffect(() => {
    !searchMode && setSearch(initialSearch)
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
            <BackButton icon={chevronBack} action={() => setSearchMode(false)} />
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
              hidden={filter.category.length === 0 && filter.status.length === 0}
              onClick={() => {
                setFilter(initialFilter)
                setFilterMode(FilterPopup.none)
              }}
            >
              초기화
            </div>
            <div
              className={filter.category.length > 0 ? 'bg-yellow' : ''}
              onClick={() => {
                setFilterMode(filterMode === FilterPopup.category ? FilterPopup.none : FilterPopup.category)
              }}
            >
              ▼카테고리
            </div>
            <div
              className={filter.status.length > 0 ? 'bg-yellow' : ''}
              onClick={() => {
                setFilterMode(filterMode === FilterPopup.status ? FilterPopup.none : FilterPopup.status)
              }}
            >
              ▼거래상태
            </div>
          </div>
        </div>
      </IonHeader>

      <IonContent>
        {/* TODO extract as component */}
        <div className='justify-around' hidden={filterMode !== FilterPopup.category}>
          <div className='absolute z-10 w-full bg-white'>
            {store.categories
              .sort((a, b) => (a.name <= b.name ? -1 : 1))
              .map((category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    setFilter(
                      filter.category.includes(category.id)
                        ? { ...filter, category: filter.category.filter((v) => v !== category.id) }
                        : { ...filter, category: [...filter.category, category.id] }
                    )
                  }}
                >
                  {category.name}
                  {filter.category.includes(category.id) ? ' V' : ''}
                </div>
              ))}
          </div>
          <IonBackdrop
            onIonBackdropTap={() => {
              setFilterMode(FilterPopup.none)
            }}
          />
        </div>

        <div className='justify-around' hidden={filterMode !== FilterPopup.status}>
          <div className='absolute z-10 w-full bg-white'>
            {store.status.map((status) => (
              <div
                key={status}
                onClick={() => {
                  setFilter(
                    filter.status.includes(status)
                      ? { ...filter, status: filter.status.filter((v) => v !== status) }
                      : { ...filter, status: [...filter.status, status] }
                  )
                }}
              >
                {status}
                {filter.status.includes(status) ? ' V' : ''}
              </div>
            ))}
          </div>
          <IonBackdrop
            onIonBackdropTap={() => {
              setFilterMode(FilterPopup.none)
            }}
          />
        </div>

        <div className='px-container'>
          <TradeList store={store} search={search} filter={filter} />
        </div>
      </IonContent>
    </IonPage>
  )
}
