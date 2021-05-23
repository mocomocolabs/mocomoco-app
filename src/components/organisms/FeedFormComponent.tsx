import { IonIcon } from '@ionic/react'
import dayjs from 'dayjs'
import { calendar } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { FC, useRef } from 'react'
import { useStore } from '../../hooks/use-store'
import { FEED_TYPE } from '../../models/feed.d'
import { IRadioItem } from '../../models/radio'
import { DT_FORMAT } from '../../utils/datetime-util'
import { InputNormal } from '../atoms/InputNormalComponent'
import { Pad } from '../atoms/PadComponent'
import { Radio } from '../atoms/RadioComponent'
import { Textarea } from '../atoms/TextareaComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { Toggle } from '../atoms/ToggleComponent'
import { DatetimePicker } from '../molecules/DatetimePickerComponent'
import { IImageUploaderRef, ImageUploader } from '../molecules/ImageUploaderComponent'

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

export const FeedForm: FC = () => {
  const { $feed } = useStore()
  const uploader = useRef<IImageUploaderRef>()

  const initYMD = $feed.form.scheduleDate ?? dayjs().format(DT_FORMAT.YMD)
  const initHM = $feed.form.scheduleTime ?? dayjs().add(1, 'hour').startOf('hour').format(DT_FORMAT.HM)
  $feed.setForm({ type: FEED_TYPE.NORMAL, scheduleDate: initYMD, scheduleTime: initHM })

  return useObserver(() => (
    <div>
      <div className='flex-between-center'>
        <Radio
          items={feedTypes}
          selected={$feed.form.type ?? FEED_TYPE.NORMAL}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setSelected={(type: any) => $feed.setForm({ type })}
        ></Radio>
      </div>
      <Pad className='h-5'></Pad>
      <InputNormal
        value={$feed.form.title}
        placeholder='제목(옵션)'
        onChange={(title) => $feed.setForm({ title })}
      ></InputNormal>
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
              $feed.setForm({ scheduleTime: t })
            }}
          ></DatetimePicker>
        </div>
      )}

      <ImageUploader
        className='mb-6'
        images={$feed.form.images}
        setImages={(payload) => $feed.setFormImages(payload)}
        refUploader={uploader}
      ></ImageUploader>

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
