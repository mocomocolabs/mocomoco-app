import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react'
import React, { useMemo } from 'react'
import { ISegments } from '../../models/segment'

interface ISegment {
  segments: ISegments
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

interface SegmentChangeEventDetail {
  value: string | undefined
}

export const Segment: React.FC<ISegment> = (prop) => {
  const onSegmentChanged = (e: CustomEvent<SegmentChangeEventDetail>) => {
    prop.setSelected(e.detail.value!)
  }

  const renderedSegments = useMemo(
    () =>
      Object.values(prop.segments).map((segName) => (
        <IonSegmentButton key={segName} value={segName}>
          <IonLabel>{segName}</IonLabel>
        </IonSegmentButton>
      )),
    [prop.segments]
  )

  return (
    <IonSegment onIonChange={onSegmentChanged} value={prop.selected}>
      {renderedSegments}
    </IonSegment>
  )
}
