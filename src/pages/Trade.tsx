import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from '@ionic/react'
import { create, filter, search } from 'ionicons/icons'
import React, { useState } from 'react'
import { CommunitySelector } from '../components/molecules/CommunitySelectorComponent'
import { StuffList } from '../components/organisms/StuffListComponent'

const segment = {
  stuff: '물건',
  talent: '재능',
}

interface SegmentChangeEventDetail {
  value: string | undefined
}

export const Trade: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState(segment.stuff)

  const onSegmentChanged = (e: CustomEvent<SegmentChangeEventDetail>) => {
    setSelectedSegment(e.detail.value === undefined ? segment.stuff : e.detail.value)
  }

  const renderSegments = () =>
    Object.values(segment).map((segName) => (
      <IonSegmentButton key={segName} value={segName}>
        <IonLabel>{segName}</IonLabel>
      </IonSegmentButton>
    ))

  const renderContent = () => {
    if (selectedSegment === segment.stuff) {
      return <StuffList />
    } else {
      return <div>{segment.talent.valueOf()}</div>
    }
  }

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

      <IonSegment onIonChange={onSegmentChanged} value={selectedSegment}>
        {renderSegments()}
      </IonSegment>

      <IonContent>
        <div className='px-container'>{renderContent()}</div>
      </IonContent>
    </IonPage>
  )
}
