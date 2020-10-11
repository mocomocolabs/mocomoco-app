import { IonIcon, useIonViewDidLeave } from '@ionic/react'
import dayjs from 'dayjs'
import { calendar } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { FEED_TYPE } from '../../models/feed.d'
import { IRadioItem } from '../../models/radio'
import { DT_FORMAT } from '../../utils/datetime-util'
import { Input } from '../atoms/InputComponent'
import { Pad } from '../atoms/PadComponent'
import { Radio } from '../atoms/RadioComponent'
import { Textarea } from '../atoms/TextareaComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { Toggle } from '../atoms/ToggleComponent'
import { DatetimePicker } from '../molecules/DatetimePickerComponent'
import { ImageUploader } from '../molecules/ImageUploaderComponent'

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
  const { $feed } = useStore()

  const initYMD = $feed.form.scheduleDate ?? dayjs().format(DT_FORMAT.YMD)
  const initHM = $feed.form.scheduleTime ?? dayjs().add(1, 'hour').startOf('hour').format(DT_FORMAT.HM)

  useIonViewDidLeave(() => {
    // TODO : 리셋시, 리렌더링되면서 다시 값이 셋팅되는 이슈가 있음
    setTimeout(() => $feed.resetForm(), 1000)
  })

  return useObserver(() => (
    <div>
      <div className='flex-between-center'>
        <Radio
          items={feedTypes}
          selected={$feed.form.type ?? FEED_TYPE.NORMAL}
          setSelected={(type: any) => $feed.setForm({ type })}
        ></Radio>
      </div>
      <Pad className='h-5'></Pad>
      <Input
        value={$feed.form.title}
        placeholder='제목(옵션)'
        onChange={(title) => $feed.setForm({ title })}
      ></Input>
      <Textarea
        value={$feed.form.content}
        onChange={(content) => $feed.setForm({ content })}
        rows={10}
        placeholder='어떤 일이 있으셨나요?'
      ></Textarea>
      {$feed.form.type === FEED_TYPE.SCHEDULE && (
        <div className='flex-between-center mt-3'>
          <IonIcon icon={calendar} size='large'></IonIcon>
          <DatetimePicker
            value={`${initYMD} ${initHM}`}
            onChangeDate={(d) => {
              $feed.setForm({ scheduleDate: d })
            }}
            onChangeTime={(t) => {
              console.log(t)

              $feed.setForm({ scheduleTime: t })
            }}
          ></DatetimePicker>
        </div>
      )}

      <ImageUploader images={$feed.form.images}></ImageUploader>

      <div className='flex-between-center'>
        <TextLg>전체공개</TextLg>
        <Toggle
          checked={$feed.form.isPublic ?? false}
          onChange={(isPublic) => $feed.setForm({ isPublic })}
        ></Toggle>
      </div>
    </div>
  ))
}
