import {
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import dayjs from 'dayjs'
import { calendar } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { FC, useRef } from 'react'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { Icon } from '../components/atoms/IconComponent'
import { InputNormal } from '../components/atoms/InputNormalComponent'
import { Pad } from '../components/atoms/PadComponent'
import { Radio } from '../components/atoms/RadioComponent'
import { Textarea } from '../components/atoms/TextareaComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { DatetimePicker } from '../components/molecules/DatetimePickerComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { useStore } from '../hooks/use-store'
import { FeedType, FEED_TYPE } from '../models/feed.d'
import { IRadioItem } from '../models/radio'
import { route } from '../services/route-service'
import { DT_FORMAT } from '../utils/datetime-util'
import { executeWithError } from '../utils/http-helper-util'

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

export interface IFeedWrite {}

export const FeedWritePage: FC<IFeedWrite> = () => {
  const { $ui, $feed, $community } = useStore()

  const uploader = useRef<IImageUploaderRef>()
  const isUpdate = $feed.form.id !== undefined

  const initYMD = $feed.form.scheduleDate ? $feed.form.scheduleDate : dayjs().format(DT_FORMAT.YMD)
  const initHM = $feed.form.scheduleTime
    ? $feed.form.scheduleTime
    : dayjs().add(1, 'hour').startOf('hour').format(DT_FORMAT.HM)

  $feed.setForm({ type: $feed.form.type ?? FEED_TYPE.NORMAL, scheduleDate: initYMD, scheduleTime: initHM })

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
    if (isUpdate) {
      $feed.resetForm()
    }
  })

  return useObserver(() => {
    // TODO : 아래 로그를 찍어주어야, SubmitBtn의 $feed가 갱신됌
    console.log($feed.form.content)

    const SubmitBtn = () => (
      <div
        className={$feed.form.content ? '' : 'gray'}
        slot='end'
        onClick={() =>
          $feed.form.content &&
          executeWithError(async () => {
            await $feed.saveFeed(
              {
                ...$feed.form,
                communityId: $community.selectedId,
              },
              isUpdate
            )
            route.feed()
          })
        }
      >
        완료
      </div>
    )

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div slot='start'>
              <BackButton type='close'></BackButton>
            </div>
            <div slot='end'>
              <SpinnerWrapper task={$feed.saveFeed} Submit={SubmitBtn}></SpinnerWrapper>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className='px-container'>
            <ImageUploader
              className='mb-6'
              images={$feed.form.images}
              setImages={(param) => $feed.setFormImage(param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>
            <div className='flex-between-center'>
              <Radio
                items={feedTypes}
                selected={$feed.form.type ?? FEED_TYPE.NORMAL}
                setSelected={(type) => $feed.setForm({ type: type as FeedType })}
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
              <>
                <InputNormal
                  value={$feed.form.scheduleTitle}
                  placeholder='일정명'
                  onChange={(scheduleTitle) => $feed.setForm({ scheduleTitle })}
                ></InputNormal>
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
              </>
            )}
          </div>
        </IonContent>

        <IonFooter>
          <div className='px-container flex-between-center height-56 shadow-sm'>
            {/* TODO: 카메라 플러그인 추가 */}
            <Icon
              name={$feed.form.images?.length ? 'image-solid' : 'image'}
              className='icon-yellow'
              onClick={() => uploader.current?.click()}
            ></Icon>
            <Checkbox
              label='전체 공개'
              onClick={() => $feed.setForm({ isPublic: $feed.form.isPublic })}
              checked={$feed.form.isPublic}
            ></Checkbox>
          </div>
        </IonFooter>
      </IonPage>
    )
  })
}
