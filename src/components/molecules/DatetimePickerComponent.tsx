import { IonDatetime } from '@ionic/react'
import dayjs from 'dayjs'
import React, { FC } from 'react'
import { DT_FORMAT, hm, ymd } from '../../utils/datetime-util'

export interface IDatetimePicker {
  value?: string
  onChangeDate?: (date: string) => void
  onChangeTime?: (time: string) => void
}

export const DatetimePicker: FC<IDatetimePicker> = ({ value, onChangeDate, onChangeTime }) => {
  return (
    <>
      <IonDatetime
        displayFormat='YYYY.MM.DD'
        pickerFormat='YYYY MM DD'
        min={ymd()}
        max={dayjs().add(2, 'year').format(DT_FORMAT.Y)}
        doneText='입력'
        cancelText='취소'
        value={ymd(value)}
        onIonChange={(e) => {
          onChangeDate && onChangeDate(ymd(e.detail.value!))
        }}
      ></IonDatetime>
      <IonDatetime
        displayFormat='HH:mm'
        pickerFormat='HH:mm'
        doneText='입력'
        cancelText='취소'
        value={hm(value)}
        onIonChange={(e) => {
          onChangeTime && onChangeTime(e.detail.value!)
        }}
      ></IonDatetime>
    </>
  )
}
