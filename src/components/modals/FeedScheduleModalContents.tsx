import dayjs from 'dayjs'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { IFeedSchedule, ScheduleType } from '../../models/feed.d'
import { DT_FORMAT } from '../../utils/datetime-util'
import { maxLengthValidator } from '../../utils/form-util'
import { executeWithError } from '../../utils/http-helper-util'
import { InputNormal } from '../atoms/InputNormalComponent'
import { Pad } from '../atoms/PadComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { DatetimePicker } from '../molecules/DatetimePickerComponent'

interface IFeedScheduleModal {
  schedule?: Partial<IFeedSchedule>
  setSchedule: (schedule: Partial<IFeedSchedule>) => void
  setSubmittable?: (submittable: boolean) => void
  forwardRef: React.RefObject<HTMLFormElement>
}

export const FeedScheduleModalContents: FC<IFeedScheduleModal> = ({
  schedule: init,
  setSchedule,
  setSubmittable,
  forwardRef: ref,
}) => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(true)
  }, [])

  const now = dayjs()
  const initYMD = now.format(DT_FORMAT.YMD)
  const initHMS = now.add(1, 'hour').startOf('hour').format(DT_FORMAT.HMS)

  const {
    formState: { isValid, dirtyFields, errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<IFeedSchedule>({
    mode: 'onChange',
    defaultValues: {
      //
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      title: '',
      place: '',
      ...init,
      type: ScheduleType.FEED,
      isUse: true,
    },
  })

  const [
    //
    watchStartDate,
    watchStartTime,
    watchEndDate,
    watchEndTime,
  ] = watch(['startDate', 'startTime', 'endDate', 'endTime'])

  const setValueCustom = useCallback((name, value) => {
    // shouldTouch: true 설정하면, checkbox값이 변경되어도 dirtyFields에 포함되지 않는다. 이유는 모름.
    setValue(name, value, { shouldDirty: true, shouldValidate: true })
  }, [])

  useEffect(() => {
    !watchStartDate && setValueCustom('startDate', initYMD)
    !watchStartTime && setValueCustom('startTime', initHMS)
    !watchEndDate && setValueCustom('endDate', initYMD)
    !watchEndTime && setValueCustom('endTime', initHMS)
  }, [])

  useEffect(() => {
    setSubmittable && setSubmittable(isValid && Object.keys(dirtyFields).length > 0)
  }, [isValid, dirtyFields, Object.keys(dirtyFields).length])

  const onSubmit = useCallback((form: IFeedSchedule) => {
    executeWithError(async () => {
      const { startDate, startTime, endDate, endTime } = form

      const validDate = startDate + startTime <= endDate + endTime

      if (!validDate) {
        throw new Error('종료일시가 시작일시보다 빠릅니다.<br />일시를 확인해주세요.')
      }

      setSchedule(form)
      $ui.hideModal()
    })
  }, [])

  const startDateTime = useMemo(() => `${watchStartDate} ${watchStartTime}`, [watchStartDate, watchStartTime])
  const endDateTime = useMemo(() => `${watchEndDate} ${watchEndTime}`, [watchEndDate, watchEndTime])

  return (
    <form id='schedule-form' onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <input type='hidden' {...register('startDate', { required: true })} />
      <input type='hidden' {...register('startTime', { required: true })} />
      <input type='hidden' {...register('endDate', { required: true })} />
      <input type='hidden' {...register('endTime', { required: true })} />

      <div className='px-container'>
        <Pad className='h-3' />
        <InputNormal
          placeholder='일정의 제목을 입력해주세요'
          register={register('title', {
            required: true,
            validate: (value) => maxLengthValidator(value, 100),
          })}
        />
        <ValidationMessage message={errors.title?.message} />

        <div className='flex-between-center mt-3 px-3'>
          <TextBase>시작 일시</TextBase>
          <DatetimePicker
            value={startDateTime}
            onChangeDate={(date) => setValueCustom('startDate', date)}
            onChangeTime={(time) => setValueCustom('startTime', time)}
          />
        </div>
        <div className='flex-between-center mt-3 px-3'>
          <TextBase>종료 일시</TextBase>
          <DatetimePicker
            value={endDateTime}
            onChangeDate={(date) => setValueCustom('endDate', date)}
            onChangeTime={(time) => setValueCustom('endTime', time)}
          />
        </div>
        <Pad className='h-2' />
        <XDivider />
        <InputNormal
          placeholder='장소를 입력해주세요'
          register={register('place', {
            required: true,
            validate: (value) => maxLengthValidator(value, 100),
          })}
        />
        <ValidationMessage message={errors.place?.message} />
      </div>
    </form>
  )
}
