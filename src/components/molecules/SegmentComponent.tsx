import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react'
import React from 'react'
import { ISegments, SEGMENT_KEYS } from '../../models/segment'

interface ISegment {
  segments: ISegments
  selected: SEGMENT_KEYS
  onChange: (segment: SEGMENT_KEYS) => void
}

interface SegmentChangeEventDetail {
  value: string | undefined
}

export const Segment: React.FC<ISegment> = ({ segments, selected, onChange }) => {
  const onSegmentChanged = (e: CustomEvent<SegmentChangeEventDetail>) => {
    onChange(e.detail.value! as SEGMENT_KEYS)
  }

  const segmentButtons = Object.entries(segments).map(([segmentKey, { label }]) => (
    <IonSegmentButton key={segmentKey} value={segmentKey}>
      <IonLabel>{label}</IonLabel>
    </IonSegmentButton>
  ))

  return (
    <IonSegment onIonChange={onSegmentChanged} value={selected}>
      {segmentButtons}
    </IonSegment>
  )
}
