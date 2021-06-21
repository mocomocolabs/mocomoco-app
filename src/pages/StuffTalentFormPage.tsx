import { IonContent, IonFooter, IonPage, useIonViewWillEnter } from '@ionic/react'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { Icon } from '../components/atoms/IconComponent'
import { InputNormal } from '../components/atoms/InputNormalComponent'
import { Pad } from '../components/atoms/PadComponent'
import { Radio } from '../components/atoms/RadioComponent'
import { Textarea } from '../components/atoms/TextareaComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { IRadioItem } from '../models/radio.d'
import {
  IStuffTalentForm,
  StuffTalentMethod,
  StuffTalentStatus,
  StuffTalentType,
} from '../models/stufftalent.d'
import { route } from '../services/route-service'
import { executeWithError } from '../utils/http-helper-util'

const types: IRadioItem[] = [
  {
    label: '팔아요',
    value: StuffTalentType.GIVE,
  },
  {
    label: '구해요',
    value: StuffTalentType.TAKE,
  },
]

const methods: IRadioItem[] = [
  {
    label: '판매', // TODO 구해요 이면, 구매?
    value: StuffTalentMethod.SELL,
  },
  {
    label: '나눔',
    value: StuffTalentMethod.FREE,
  },
  {
    label: '교환',
    value: StuffTalentMethod.EXCHANGE,
  },
]

export const StuffTalentFormPage: React.FC = () => {
  const { $ui, $stuff, $talent, $community } = useStore()

  const { pathname } = useLocation()
  // TODO fix here
  const store = pathname === '/stuff-form' ? $stuff : $talent
  const title = pathname === '/stuff-form' ? '물건' : '재능'
  const routeList = () => (pathname === '/stuff-form' ? route.stuff() : route.talent())

  const {
    formState: { isValid },
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<IStuffTalentForm>({
    mode: 'onChange',
  })

  const watchType = watch('type', store.form.type)
  const watchMethod = watch('method', store.form.method)
  const watchPrice = watch('price', store.form.price)
  const watchExchangeText = watch('exchangeText', store.form.exchangeText)
  const watchImages = watch('images', store.form.images)

  const uploader = useRef<IImageUploaderRef>()

  const setValueCustom = useCallback(
    (name, value, options?) => {
      setValue(name, value, { ...options, shouldDirty: true, shouldValidate: true })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // TODO: 수정 모드인 경우, 데이터 변경이 있을 때만 완료 버튼 활성화되도록 조건 추가 필요. dirtyFields 활용해야 할 듯
  const submittable = useMemo(() => {
    const isValidMethod =
      watchMethod === StuffTalentMethod.FREE ||
      (watchMethod === StuffTalentMethod.SELL && watchPrice && watchPrice >= 0) ||
      (watchMethod === StuffTalentMethod.EXCHANGE && watchExchangeText && watchExchangeText.length > 0)

    return isValid && isValidMethod
  }, [isValid, watchMethod, watchPrice, watchExchangeText])

  const onSubmit = handleSubmit(async (form) => {
    store.setForm(form)
    executeWithError(async () => {
      await store.insertItem(getValues())

      routeList()
    })
  })

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useEffect(
    () => {
      // react-hook-form의 dirtyFields가 정상적으로 동작하려면,
      // 제공하는 api를 이용해서 default value 값들을 설정해 줘야 함.
      // 1. useForm 호출 시 defaultValues 프로퍼티 설정하거나,
      // 2. reset() 호출해서 default value를 재설정하기
      //
      // 이렇게 하지 않고, input 필드에 직접 defaultValue를 지정할 경우에는
      // 필드를 한 번 클릭만 해도 dirtyFields에 포함되며, 다시 원래 값으로 돌려놔도
      // dirtyFields에서 제외되지 않고 계속 남아 있음.
      reset(
        { ...store.form, communityId: $community.selectedId, status: StuffTalentStatus.AVAILABLE },
        { keepDefaultValues: false }
      )

      return () => {
        // TODO 임시저장할 조건 확인 필요
        const [title, content, images] = getValues(['title', 'content', 'images'])

        if (title || content || images?.length) {
          store.setForm(getValues())
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <IonPage>
      <Header>
        <div slot='start' className='text-header'>
          <BackButton type='close'></BackButton>
        </div>
        <div className='text-header text-center'>{title}</div>

        <div slot='end'>
          <SpinnerWrapper
            task={store.insertItem}
            Submit={() => (
              <button slot='end' form='stufftalent-form' type='submit' disabled={!submittable}>
                완료
              </button>
            )}
          ></SpinnerWrapper>
        </div>
      </Header>
      <IonContent>
        <div className='px-container py-5'>
          <form id='stufftalent-form' onSubmit={onSubmit}>
            <input type='hidden' {...register('type', { required: true })} />
            <input type='hidden' {...register('method', { required: true })} />
            <input type='hidden' {...register('images', { required: false })} />
            {/* TODO category 선택화면 구현 후 required: true로 설정하기 */}
            <input hidden={true} {...register('categoryId', { required: false })} />

            <ImageUploader
              className='mb-6'
              images={watchImages}
              setImages={(param) => setValueCustom('images', param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>
            <div className='flex-between-center'>
              <Radio
                items={types}
                selected={watchType ?? ''}
                setSelected={(type) => {
                  setValueCustom('type', type as StuffTalentType)
                }}
              ></Radio>
            </div>
            <Pad className='h-5'></Pad>
            <button
              className='w-full px-4 mb-4 py-3 br-base border-gray bg-white text-left text-sm'
              type='button'
              onClick={() => {
                // TODO show category popup
              }}
            >
              카테고리 선택
            </button>
            <InputNormal placeholder='제목' register={register('title', { required: true })}></InputNormal>
            <div className='flex-between-center'>
              <Radio
                items={methods}
                selected={watchMethod ?? ''}
                setSelected={(method) => {
                  setValueCustom('method', method as StuffTalentMethod)
                }}
              ></Radio>
            </div>
            <Pad className='h-5'></Pad>
            <InputNormal
              hidden={watchMethod !== StuffTalentMethod.SELL}
              type='number'
              placeholder='원하시는 가격을 적어주세요'
              register={register('price')}
            ></InputNormal>
            <InputNormal
              hidden={watchMethod !== StuffTalentMethod.EXCHANGE}
              placeholder='무엇과 교환하고 싶으신가요?'
              register={register('exchangeText')}
            ></InputNormal>
            <div className='flex-between-center'>
              <Checkbox
                name='isExchangeable'
                label='교환 가능'
                defaultChecked={store.form.isExchangeable}
                register={register}
              ></Checkbox>
              <Checkbox
                name='isNegotiable'
                label='가격제안 가능'
                defaultChecked={store.form.isNegotiable}
                register={register}
              ></Checkbox>
            </div>
            <Pad className='h-5'></Pad>
            <Textarea
              rows={10}
              placeholder='물건/재능이 새로운 활용처를 찾을 수 있도록 자유롭게 소개해주세요 :)'
              register={register('content', { required: true })}
            ></Textarea>
          </form>
        </div>
      </IonContent>
      <IonFooter>
        <div className='px-container flex-between-center height-56 shadow-sm'>
          {/* TODO: 카메라 플러그인 추가 */}
          <Icon
            name={watchImages?.length ? 'image-solid' : 'image'}
            className='icon-yellow'
            onClick={() => uploader.current?.click()}
          ></Icon>
          <Checkbox
            name='isPublic'
            label='전체 공개'
            defaultChecked={store.form.isPublic!}
            register={register}
          ></Checkbox>
        </div>
      </IonFooter>
    </IonPage>
  )
}
