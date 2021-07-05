import { IonContent, IonHeader, IonPage, IonSearchbar, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { reaction } from 'mobx'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Icon } from '../components/atoms/IconComponent'
import { Pad } from '../components/atoms/PadComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { FilterBar } from '../components/molecules/FilterBarComponent'
import { FilterPopup } from '../components/molecules/FilterPopupComponent'
import { StuffTalentList } from '../components/organisms/StuffTalentListComponent'
import { useStore } from '../hooks/use-store'
import { getPageKey, routeFunc, typeLabels } from '../models/stufftalent'
import { IStuffTalentFilter, StuffTalentPageKey, StuffTalentStatus } from '../models/stufftalent.d'

interface SearchbarChangeEventDetail {
  value: string | undefined
}

const FilterMode = { none: 'none', category: '카테고리', type: '거래유형' }
type FilterMode = typeof FilterMode[keyof typeof FilterMode]

const initialSearch = ''

export const StuffTalentPage: React.FC = () => {
  const { $stuff, $talent, $ui, $community } = useStore()

  const pageData = {
    [StuffTalentPageKey.STUFF]: { store: $stuff },
    [StuffTalentPageKey.TALENT]: { store: $talent },
  }

  const { store } = pageData[getPageKey(useLocation().pathname)]
  const { routeForm } = routeFunc[store.predefined.pageKey]

  const [searchMode, setSearchMode] = useState(false)
  const [search, setSearch] = useState(initialSearch)
  const onSearchSubmit = (e: CustomEvent<SearchbarChangeEventDetail>) => setSearch(e.detail.value!)

  const initialFilter: IStuffTalentFilter = {
    isPublic: false,
    communityId: $community.selectedId,
    categories: [],
    notStatuses: [],
    types: [],
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

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  useEffect(() => {
    //TODO 상세보기 들어갔다가 돌아올 때 기존 filter값 유지되는지 확인할 것
    const disposeReaction = reaction(
      () => $community.selectedId,
      (selectedId) => {
        // TODO 모든 공동체 선택 시 isPublic=true 처리 필요
        setFilter({ ...filter, communityId: selectedId })
      }
    )

    return () => {
      disposeReaction()
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
            <div className='flex' slot='end'>
              <div
                onClick={() => {
                  const isWriting = store.form.title || store.form.content || store.form.images?.length

                  if (isWriting) {
                    return $ui.showAlert({
                      isOpen: true,
                      message: '작성하던 글이 있어요. 이어서 작성하시겠어요?',
                      onSuccess() {
                        routeForm()
                      },
                      onFail() {
                        store.resetForm()
                        routeForm()
                      },
                    })
                  }

                  routeForm()
                }}
              >
                <Icon name='pencil' className='ml-4 icon-24'></Icon>
              </div>
              <div onClick={() => setSearchMode(true)}>
                <Icon name='search' className='ml-4 icon-24'></Icon>
              </div>
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

        <div className='px-container mt-1'>
          <FilterBar
            filters={[
              { name: FilterMode.category, length: filter.categories.length },
              { name: FilterMode.type, length: filter.types.length + filter.notStatuses.length },
            ]}
            onReset={onResetFilter}
            onClick={(name: string) => {
              setFilterMode(filterMode === name ? FilterMode.none : name)
            }}
          />
        </div>
      </IonHeader>

      <Pad className='h-3' />

      <FilterPopup
        show={filterMode === FilterMode.category}
        filterInfos={[
          {
            filter: filter.categories,
            items: store.categories.map((c) => ({ value: c.id, label: c.name })),
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

      <IonContent>
        <div className='px-container mt-1'>
          <StuffTalentList store={store} search={search} filter={filter} />
        </div>
      </IonContent>
    </IonPage>
  )
}
