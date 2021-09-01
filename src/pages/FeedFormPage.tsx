import { IonContent, IonPage } from '@ionic/react'
import { reaction } from 'mobx'
import { useObserver } from 'mobx-react-lite'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
import { Icon } from '../components/atoms/IconComponent'
import { InputNormal } from '../components/atoms/InputNormalComponent'
import { IsPublicToast } from '../components/atoms/IsPublicToast'
import { Pad } from '../components/atoms/PadComponent'
import { Textarea } from '../components/atoms/TextareaComponent'
import { TextBase } from '../components/atoms/TextBaseComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { FeedScheduleModalContents } from '../components/modals/FeedScheduleModalContents'
import { BackButton } from '../components/molecules/BackButtonComponent'
import {
  assignPreview,
  IImageUploaderRef,
  ImageUploader,
} from '../components/molecules/ImageUploaderComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'
import { datetimeRange } from '../utils/datetime-util'
import { executeWithError } from '../utils/http-helper-util'

export interface IFeedForm {}

export const FeedFormPage: FC<IFeedForm> = () => {
  const { $ui, $feed, $auth } = useStore()

  const uploader = useRef<IImageUploaderRef>()
  const isUpdate = $feed.updateForm.id !== undefined

  useEffect(() => {
    $ui.setIsBottomTab(false)

    return () => {
      if (isUpdate) {
        // TODO check if submit completed
        const submitCompleted = true
        submitCompleted && $feed.resetUpdateForm()
      } else {
        const needToSaveTemp =
          $feed.form.title || $feed.form.content || $feed.form.images?.length || $feed.form.schedule

        !needToSaveTemp && $feed.resetForm()
      }
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

            isUpdate ? route.feedDetail($feed.form.id!, undefined, true) : route.feed()

            $feed.resetForm()
          })
        }
      />
    ),
    [$feed.form.content, $auth.user.communityId, $feed.form]
  )

  const scheduleRef = useRef<HTMLFormElement>(null)

  const scheduleModalSubmitButton = useCallback(
    (submittable: boolean) => (
      <HeaderSubmitText
        isSubmittable={submittable}
        onSubmit={() =>
          scheduleRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }
      />
    ),
    []
  )

  const showScheduleModal = useCallback(() => {
    $ui.showModal({
      title: $feed.form.schedule ? '일정 변경하기' : '일정 만들기',
      submit: scheduleModalSubmitButton,
      render: () => (
        <FeedScheduleModalContents
          schedule={$feed.form.schedule}
          setSchedule={(data) =>
            $feed.setFormSchedule({
              ...data,
              formatScheduleTime: datetimeRange(
                data.startDate + data.startTime!,
                data.endDate + data.endTime!
              ),
            })
          }
          setSubmittable={(submittable) => $ui.setModalSubmittable(submittable)}
          forwardRef={scheduleRef}
        />
      ),
    })
  }, [])

  const [showSchedule, setShowSchedule] = useState(false)

  useEffect(() => {
    const disposeReaction = reaction(
      () => $feed.form.schedule,
      (schedule) => setShowSchedule(!!schedule)
    )

    return () => disposeReaction()
  }, [])

  return useObserver(() => {
    return (
      <IonPage>
        <Header
          start={<BackButton type='close' />}
          center='이야기창고'
          end={<SpinnerWrapper task={$feed.saveFeed} Submit={SubmitBtn}></SpinnerWrapper>}
        />

        <IonContent>
          <div className='px-container'>
            <ImageUploader
              className='mt-5'
              images={$feed.form.images?.map((v, i) => assignPreview(v, i))}
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
              onChange={(content) => $feed.setForm({ content: content! })}
              rows={10}
              autoGrow={true}
              maxLength={255}
              placeholder='나누고 싶은 이야기를 자유롭게 적어주세요 :)'
            ></Textarea>
            {showSchedule && (
              <div className='br-lg shadow p-3 mt-5 relative'>
                <div onClick={showScheduleModal}>
                  <div className='flex items-center'>
                    <Icon name='calendar' className='icon-secondary'></Icon>
                    <TextBase className='ml-2 text-bold'>{$feed.form.schedule?.title}</TextBase>
                  </div>
                  <div className='flex items-center mt-1'>
                    <Icon name='time' className='icon-secondary'></Icon>
                    <TextBase className='ml-2'>{$feed.form.schedule?.formatScheduleTime}</TextBase>
                  </div>
                  <div className='flex items-center mt-1'>
                    <Icon name='location' className='icon-secondary'></Icon>
                    <TextBase className='ml-2'>{$feed.form.schedule?.place}</TextBase>
                  </div>
                </div>
                <Icon
                  name='delete'
                  className='absolute mr-2 mt-2 right-0 top-0 uploader-delete-icon'
                  onClick={(e) => {
                    e.preventDefault()
                    $feed.resetFormSchedule()
                  }}
                />
              </div>
            )}
          </div>
        </IonContent>

        <Footer>
          {/* TODO: 카메라 플러그인 추가 */}
          <div className='flex-between-center gap-4'>
            <Icon
              name={$feed.form.images?.length ? 'image-solid' : 'image'}
              className='icon-secondary'
              onClick={() => uploader.current?.click()}
            />
            <Icon
              name={$feed.form.schedule?.title ? 'calendar-solid' : 'calendar'}
              className='icon-secondary'
              onClick={showScheduleModal}
            />
          </div>
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
