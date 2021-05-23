import { IonDatetime } from '@ionic/react'
import dayjs from 'dayjs'
import { FC } from 'react'
import { ymd } from '../../utils/datetime-util'

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
        min={dayjs().format('YYYY-MM-DD')}
        max={dayjs().add(2, 'year').format('YYYY')}
        doneText='입력'
        cancelText='취소'
        value={dayjs(value).format('YYYY-MM-DD')}
        onIonChange={(e) => {
          onChangeDate && onChangeDate(ymd(e.detail.value!))
        }}
      ></IonDatetime>
      <IonDatetime
        displayFormat='HH:mm'
        pickerFormat='HHmm'
        doneText='입력'
        cancelText='취소'
        value={dayjs(value).format('HH:mm')}
        onIonChange={(e) => {
          onChangeTime && onChangeTime(e.detail.value!.replace(':', ''))
        }}
      ></IonDatetime>
    </>
  )
}
