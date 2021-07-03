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
import { FC, useCallback, useRef } from 'react'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { Icon } from '../components/atoms/IconComponent'
import { InputNormal } from '../components/atoms/InputNormalComponent'
import { Pad } from '../components/atoms/PadComponent'
import { Textarea } from '../components/atoms/TextareaComponent'
import { TextLg } from '../components/atoms/TextLgComponent'
import { TextXl } from '../components/atoms/TextXlComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { DatetimePicker } from '../components/molecules/DatetimePickerComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { useStore } from '../hooks/use-store'
import { FEED_TYPE } from '../models/feed.d'
import { route } from '../services/route-service'
import { DT_FORMAT } from '../utils/datetime-util'
import { executeWithError } from '../utils/http-helper-util'

export interface IFeedWrite {}

export const FeedWritePage: FC<IFeedWrite> = () => {
  const { $ui, $feed, $auth } = useStore()

  const uploader = useRef<IImageUploaderRef>()
  const isUpdate = $feed.form.id !== undefined

  const initYMD = $feed.form.schedule?.startDate ?? dayjs().format(DT_FORMAT.YMD)
  const initHM = $feed.form.schedule?.startTime ?? dayjs().add(1, 'hour').startOf('hour').format(DT_FORMAT.HM)

  $feed.setForm({
    type: FEED_TYPE.NORMAL,
    // schedule: {
    //   ...$feed.form.schedule,
    //   startDate: initYMD,
    //   startTime: initHM,
    //   endDate: initYMD,
    //   endTime: initHM,
    // },
  })

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
    if (isUpdate) {
      $feed.resetForm()
    }
  })

  const SubmitBtn = useCallback(
    () => (
      <div
        slot='end'
        onClick={() =>
          $feed.form.content &&
          executeWithError(async () => {
            await $feed.saveFeed(
              {
                ...$feed.form,
                communityId: $auth.user.communityId,
              },
              isUpdate
            )
            route.feed()
          })
        }
      >
        <TextLg className={$feed.form.content ? '' : 'gray'}>완료</TextLg>
      </div>
    ),
    [$feed.form.content, $auth.user.communityId, $feed.form]
  )

  return useObserver(() => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div slot='start'>
              <BackButton type='close'></BackButton>
            </div>
            <TextXl className='text-center text-bold'>이야기창고</TextXl>
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
            <Pad className='h-5'></Pad>
            <InputNormal
              value={$feed.form.title}
              placeholder='제목(선택사항)'
              onChange={(title) => $feed.setForm({ title })}
            ></InputNormal>
            <Textarea
              value={$feed.form.content}
              onChange={(content) => $feed.setForm({ content })}
              rows={10}
              placeholder='나누고 싶은 이야기를 자유롭게 작성해주세요 :)'
            ></Textarea>
            {$feed.form.schedule && (
              <>
                <InputNormal
                  value={$feed.form.schedule.title}
                  placeholder='일정명'
                  onChange={(title) => $feed.setFormSchedule({ title })}
                ></InputNormal>
                <div className='flex-between-center mt-3'>
                  <IonIcon icon={calendar} size='large'></IonIcon>
                  <DatetimePicker
                    value={`${initYMD} ${initHM}`}
                    onChangeDate={(d) => {
                      $feed.setFormSchedule({ startDate: d })
                    }}
                    onChangeTime={(t) => {
                      $feed.setFormSchedule({ startTime: t })
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
              className='icon-secondary'
              onClick={() => uploader.current?.click()}
            ></Icon>
            <Checkbox
              label='전체 공개'
              defaultChecked={$feed.form.isPublic}
              onChange={(checked) => $feed.setForm({ isPublic: checked })}
            ></Checkbox>
          </div>
        </IonFooter>
      </IonPage>
    )
  })
}
