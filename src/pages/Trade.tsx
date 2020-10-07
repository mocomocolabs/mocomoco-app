import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { create, filter, search } from 'ionicons/icons'
import React, { useState } from 'react'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { Segment } from '../components/molecules/SegmentComponent'
import { TradeList } from '../components/organisms/TradeListComponent'
import { useStore } from '../hooks/use-store'
import { ISegments } from '../models/segment'

export const segments: ISegments = {
  stuff: '물건',
  talent: '재능',
}

const defaultSegment = segments.stuff

export const Trade: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState(defaultSegment)

  const { $stuff, $talent } = useStore()

  // TODO: refactoring?
  const store = selectedSegment === segments.stuff ? $stuff : $talent

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <CommunitySelector></CommunitySelector>
          </div>
          <div slot='end'>
            <IonIcon icon={filter} size='large' />
            <IonIcon icon={create} size='large' />
            <IonIcon icon={search} size='large' />
          </div>
        </IonToolbar>
      </IonHeader>

      <Segment
        segments={segments}
        default={defaultSegment}
        selected={selectedSegment}
        setSelected={setSelectedSegment}
      />

      <IonContent>
        <div className='px-container'>
          <TradeList store={store} />
        </div>
      </IonContent>
    </IonPage>
  )
}
