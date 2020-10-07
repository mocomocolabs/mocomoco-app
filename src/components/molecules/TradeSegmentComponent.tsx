import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react'
import React, { useMemo } from 'react'
import { ISegments } from '../../models/segment'

interface ISegment {
  segments: ISegments
  default: string
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

interface SegmentChangeEventDetail {
  value: string | undefined
}

export const Segment: React.FC<ISegment> = (prop) => {
  console.log('TradeSegment')

  const onSegmentChanged = (e: CustomEvent<SegmentChangeEventDetail>) => {
    console.log('onSegmentChanged')
    const newSegment = e.detail.value
    prop.setSelected(newSegment === undefined ? prop.default : newSegment)
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
