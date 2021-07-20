import { IonContent, IonIcon, IonPage } from '@ionic/react'
import dayjs from 'dayjs'
import { calendar } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { FC, useEffect, useMemo, useRef } from 'react'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
import { Icon } from '../components/atoms/IconComponent'
import { InputNormal } from '../components/atoms/InputNormalComponent'
import { IsPublicToast } from '../components/atoms/IsPublicToast'
import { Pad } from '../components/atoms/PadComponent'
import { Textarea } from '../components/atoms/TextareaComponent'
import { TextXl } from '../components/atoms/TextXlComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { DatetimePicker } from '../components/molecules/DatetimePickerComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'
import { DT_FORMAT } from '../utils/datetime-util'
import { executeWithError } from '../utils/http-helper-util'

export interface IFeedForm {}

export const FeedFormPage: FC<IFeedForm> = () => {
  const { $ui, $feed, $auth } = useStore()

  const uploader = useRef<IImageUploaderRef>()
  const isUpdate = $feed.form.id !== undefined

  const initYMD = $feed.form.schedule?.startDate ?? dayjs().format(DT_FORMAT.YMD)
  const initHM = $feed.form.schedule?.startTime ?? dayjs().add(1, 'hour').startOf('hour').format(DT_FORMAT.HM)

  // $feed.setForm({
  //   // schedule: {
  //   //   ...$feed.form.schedule,
  //   //   startDate: initYMD,
  //   //   startTime: initHM,
  //   //   endDate: initYMD,
  //   //   endTime: initHM,
  //   // },
  // })

  useEffect(() => {
    $ui.setIsBottomTab(false)

    return () => {
      isUpdate && $feed.resetForm()
    }
  }, [])

  const SubmitBtn = useMemo(
    () => (
      <HeaderSubmitText
        isSubmittable={!!$feed.form.content}
        onSubmit={() =>
          executeWithError(async () => {
            await $feed.saveFeed(
              {
                ...$feed.form,
                communityId: $auth.user.communityId,
              },
              isUpdate
            )

            await $feed.getFeeds()

            isUpdate ? route.feedDetail($feed.form.id!, undefined, true) : route.feed()

            $feed.resetForm()
          })
        }
      />
    ),
    [$feed.form.content, $auth.user.communityId, $feed.form]
  )

  return useObserver(() => {
    return (
      <IonPage>
        <Header>
          <div slot='start'>
            <BackButton type='close'></BackButton>
          </div>
          <TextXl className='text-center text-bold'>이야기창고</TextXl>
          <div slot='end'>
            <SpinnerWrapper task={$feed.saveFeed} Submit={SubmitBtn}></SpinnerWrapper>
          </div>
        </Header>

        <IonContent>
          <div className='px-container'>
            <ImageUploader
              className='mt-5'
              images={$feed.form.images}
              setImages={(param) => $feed.setFormImage(param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>
            <Pad className='h-2'></Pad>
            <InputNormal
              value={$feed.form.title}
              placeholder='제목을 입력해주세요 (선택사항)'
              onChange={(title) => $feed.setForm({ title })}
            ></InputNormal>
            <Textarea
              value={$feed.form.content}
              onChange={(content) => $feed.setForm({ content })}
              rows={10}
              placeholder='나누고 싶은 이야기를 자유롭게 적어주세요 :)'
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

        <Footer>
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
          <IsPublicToast />
        </Footer>
      </IonPage>
    )
  })
}
