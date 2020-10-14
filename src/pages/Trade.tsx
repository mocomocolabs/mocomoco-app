import { IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonToolbar } from '@ionic/react'
import { chevronBack, create, filter, search } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { Segment } from '../components/molecules/SegmentComponent'
import { TradeList } from '../components/organisms/TradeListComponent'
import { useStore } from '../hooks/use-store'
import { ISegments } from '../models/segment'

export const segments: ISegments = {
  stuff: '물건',
  talent: '재능',
}

interface SearchbarChangeEventDetail {
  value: string | undefined
}

const emptyKeyword = ''

export const Trade: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState(segments.stuff)
  const { $stuff, $talent } = useStore()
  // TODO: refactoring?
  const store = selectedSegment === segments.stuff ? $stuff : $talent

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

      <Segment segments={segments} selected={selectedSegment} setSelected={setSelectedSegment} />

      <IonContent>
        <div className='px-container'>
          <TradeList store={store} searchKeyword={searchKeyword} />
        </div>
      </IonContent>
    </IonPage>
  )
}
