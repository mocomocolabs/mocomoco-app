import { IonContent, IonPage } from '@ionic/react'
import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
import { Icon } from '../components/atoms/IconComponent'
import { InputNormal } from '../components/atoms/InputNormalComponent'
import { IsPublicToast } from '../components/atoms/IsPublicToast'
import { Pad } from '../components/atoms/PadComponent'
import { Textarea } from '../components/atoms/TextareaComponent'
import { TextBase } from '../components/atoms/TextBaseComponent'
import { ValidationMessage } from '../components/atoms/ValidationMessageComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { FeedScheduleModalContents } from '../components/modals/FeedScheduleModalContents'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { IFeedForm } from '../models/feed.d'
import { IRouteParam, route } from '../services/route-service'
import { datetimeRange } from '../utils/datetime-util'
import { maxLengthValidator } from '../utils/form-util'
import { executeWithError } from '../utils/http-helper-util'

export const FeedFormPage: FC = () => {
  const goDetailOnSubmit = useHistory<IRouteParam>().location.state?.goDetailOnSubmit

  const { $ui, $feed, $auth } = useStore()

  const uploader = useRef<IImageUploaderRef>()

  const isUpdate = !!$feed.updateForm.id
  const form = Object.assign({}, isUpdate ? { ...$feed.updateForm } : { ...$feed.form })

  const {
    formState: { isValid, dirtyFields, errors },
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<IFeedForm>({
    mode: 'onChange',
    // TODO 최종적으로는 $community.selectedId 를 사용하는 게 맞는데, 지금은 내 공동체에만 글을 쓸 수 있으니 auth.user.communityId를 사용하도록 함.
    defaultValues: { ...form, communityId: form.communityId > 0 ? form.communityId : $auth.user.communityId },
  })

  const [watchImages, watchSchedule] = watch(['images', 'schedule'])

  const setValueCustom = useCallback((name, value) => {
    // shouldTouch: true 설정하면, checkbox값이 변경되어도 dirtyFields에 포함되지 않는다. 이유는 모름.
    setValue(name, value, { shouldDirty: true, shouldValidate: true })
  }, [])

  const submittable = useMemo(() => {
    const isChangedFromDefaultValues = Object.keys(dirtyFields).length > 0

    return isValid && !(isUpdate && !isChangedFromDefaultValues)
  }, [isValid, Object.keys(dirtyFields)])

  const isSubmitCompleted = useRef(false)

  const onSubmit = handleSubmit(async (form) => {
    // delete empty schedule.
    // react-hook-form은 undefined값을 빈문자('')로 치환하기 때문에
    // undefined가 되어야 한다면 별도로 처리해줘야 한다.
    form.schedule = !!form.schedule ? form.schedule : undefined

    executeWithError(async () => {
      if (isUpdate) {
        await $feed.saveFeed(form, true)
        $feed.resetUpdateForm()
      } else {
        await $feed.saveFeed(form, false)
        $feed.resetForm()
      }

      isSubmitCompleted.current = true

      goDetailOnSubmit ? route.feedDetail(form.id!, undefined, true) : route.goBack()
    })
  })

  const SubmitBtn = useMemo(
    () => <HeaderSubmitText isSubmittable={submittable} onSubmit={onSubmit} />,
    [submittable, onSubmit]
  )

  useEffect(() => {
    $ui.setIsBottomTab(false)

    return () => {
      isUpdate ? $feed.resetUpdateForm() : $feed.resetForm()

      // TODO 임시저장 루틴을 통일하자 - 물건, 재능, 이야기 등
      if (isUpdate || isSubmitCompleted.current) return

      const [title, content, images, schedule] = getValues(['title', 'content', 'images', 'schedule'])

      if (title || content || images?.length || schedule) {
        $feed.setForm(getValues())
        console.log('cleanup', '임시저장 완료')
      }
    }
  }, [])

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
      title: !!watchSchedule ? '일정 변경하기' : '일정 만들기',
      submit: scheduleModalSubmitButton,
      render: () => (
        <FeedScheduleModalContents
          schedule={watchSchedule}
          setSchedule={(data) =>
            setValueCustom('schedule', {
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
  }, [watchSchedule])

  return (
    <IonPage>
      <Header
        start={<BackButton type='close' />}
        center='이야기창고'
        end={<SpinnerWrapper task={$feed.saveFeed} Submit={SubmitBtn} />}
      />

      <IonContent>
        <div className='px-container'>
          <form id='stufftalent-form' onSubmit={onSubmit}>
            <input type='hidden' {...register('id')} />
            <input type='hidden' {...register('images')} />
            <input type='hidden' {...register('schedule')} />
            <input type='hidden' {...register('isPublic')} />

            <ImageUploader
              className='mt-5'
              images={watchImages}
              setImages={(param) => setValueCustom('images', param)}
              refUploader={uploader as IImageUploaderRef}
            />

            <Pad className='h-2' />

            <InputNormal
              placeholder='제목을 입력해주세요 (선택사항)'
              register={register('title', {
                validate: (value) => maxLengthValidator(value, 100),
              })}
            />
            <ValidationMessage message={errors.title?.message} />

            <Textarea
              rows={10}
              autoGrow={true}
              placeholder='나누고 싶은 이야기를 자유롭게 적어주세요 :)'
              register={register('content', {
                required: true,
                validate: (value) => maxLengthValidator(value, 1000),
              })}
            />
            <ValidationMessage message={errors.content?.message} />

            {!!watchSchedule && (
              <div className='br-lg shadow p-3 mt-5 relative'>
                <div onClick={showScheduleModal}>
                  <div className='flex items-center'>
                    <Icon name='calendar' className='icon-secondary' />
                    <TextBase className='ml-2 text-bold'>{watchSchedule?.title}</TextBase>
                  </div>
                  <div className='flex items-center mt-1'>
                    <Icon name='time' className='icon-secondary' />
                    <TextBase className='ml-2'>{watchSchedule?.formatScheduleTime}</TextBase>
                  </div>
                  <div className='flex items-center mt-1'>
                    <Icon name='location' className='icon-secondary' />
                    <TextBase className='ml-2'>{watchSchedule?.place}</TextBase>
                  </div>
                </div>
                <Icon
                  name='delete'
                  className='absolute mr-2 mt-2 right-0 top-0 uploader-delete-icon'
                  onClick={(e) => {
                    e.preventDefault()
                    setValueCustom('schedule', undefined)
                  }}
                />
              </div>
            )}

            <Pad className='h-2' />
          </form>
        </div>
      </IonContent>

      <Footer>
        {/* TODO: 카메라 플러그인 추가 */}
        <div className='flex-between-center gap-4'>
          <Icon
            name={watchImages?.length ? 'image-solid' : 'image'}
            className='icon-secondary'
            onClick={() => uploader.current?.click()}
          />
          <Icon
            name={watchSchedule ? 'calendar-solid' : 'calendar'}
            className='icon-secondary'
            onClick={showScheduleModal}
          />
        </div>
        <Checkbox
          label='전체 공개'
          defaultChecked={form.isPublic}
          onChange={(checked) => setValueCustom('isPublic', checked)}
        />
        <IsPublicToast />
      </Footer>
    </IonPage>
  )
}
