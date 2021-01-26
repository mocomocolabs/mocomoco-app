import { IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonToolbar } from '@ionic/react'
import { chevronBack, create, filter, search } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { TradeList } from '../components/organisms/TradeListComponent'
import { useStore } from '../hooks/use-store'

interface SearchbarChangeEventDetail {
  value: string | undefined
}

const emptyKeyword = ''

export const TradePage: React.FC = () => {
  const { $stuff, $talent } = useStore()
  const { pathname } = useLocation()
  const store = pathname === '/stuff' ? $stuff : $talent

  const [searchMode, setSearchMode] = useState(false)
  // TODO: move searchkeyword to trade-store for recent keyword list
  const [searchKeyword, setSearchKeyword] = useState(emptyKeyword)
  const onSearchSubmit = (e: CustomEvent<SearchbarChangeEventDetail>) => setSearchKeyword(e.detail.value!)

  useEffect(() => {
    !searchMode && setSearchKeyword(emptyKeyword)
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
              <IonIcon icon={filter} size='large' />
              <IonIcon icon={create} size='large' />
              <IonIcon icon={search} size='large' onClick={() => setSearchMode(true)} />
            </div>
          </div>

          <div className='flex-between-center' hidden={!searchMode}>
            <BackButton icon={chevronBack} action={() => setSearchMode(false)} />
            <IonSearchbar
              value={searchKeyword}
              placeholder='검색'
              type='search'
              inputmode='search'
              debounce={500}
              onIonChange={onSearchSubmit}
            />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <TradeList store={store} searchKeyword={searchKeyword} />
        </div>
      </IonContent>
    </IonPage>
  )
}
