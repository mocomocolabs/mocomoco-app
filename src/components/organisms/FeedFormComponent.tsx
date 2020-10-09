import { IonIcon, IonTextarea, IonToggle } from '@ionic/react'
import dayjs from 'dayjs'
import { calendar } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { FEED_TYPE } from '../../models/feed.d'
import { IRadioItem } from '../../models/radio'
import { DT_FORMAT } from '../../utils/datetime-util'
import { Input } from '../atoms/InputComponent'
import { Pad } from '../atoms/PadComponent'
import { Radio } from '../atoms/RadioComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { DatetimePicker } from '../molecules/DatetimePickerComponent'

export interface IFeedForm {}

const feedTypes: IRadioItem[] = [
  {
    label: '새소식',
    value: FEED_TYPE.NORMAL,
  },
  {
    label: '일정',
    value: FEED_TYPE.SCHEDULE,
  },
]

export const FeedForm: FC<IFeedForm> = () => {
  const defaultTime = dayjs().add(1, 'hour').startOf('hour').format(DT_FORMAT.YMDHM)
  const [feedType, setFeedType] = useState<string>(FEED_TYPE.NORMAL)

  return useObserver(() => (
    <div>
      <div className='flex-between-center'>
        <Radio items={feedTypes} selected={feedType} setSelected={setFeedType}></Radio>
      </div>
      <Pad className='h-5'></Pad>
      <Input placeholder='제목(옵션)'></Input>
      <IonTextarea
        className='black border-border px-container leading-8'
        rows={10}
        placeholder='새로운 소식을 작성해주세요'
      ></IonTextarea>
      {feedType === FEED_TYPE.SCHEDULE && (
        <div className='flex-between-center mt-3'>
          <IonIcon icon={calendar} size='large'></IonIcon>
          <DatetimePicker
            value={defaultTime}
            onChangeDate={(d) => {
              console.log(d)
            }}
            onChangeTime={(t) => {
              console.log(t)
            }}
          ></DatetimePicker>
        </div>
      )}

      <div className='flex-between-center'>
        <TextLg>전체공개</TextLg>
        <IonToggle slot='end' name='chat_alarm_on_off' checked></IonToggle>
      </div>
    </div>
  ))
}
