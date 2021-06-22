import { IonContent, IonFooter, IonPage, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
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
import { CategorySelector } from '../components/molecules/CategorySelectorComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { typeLabels } from '../models/stufftalent'
import { IStuffTalentForm, StuffTalentType } from '../models/stufftalent.d'
import { route } from '../services/route-service'
import { executeWithError } from '../utils/http-helper-util'

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
    watch,
  } = useForm<IStuffTalentForm>({
    mode: 'onChange',
    defaultValues: { ...store.form, communityId: $community.selectedId },
  })

  const watchCategoryId = watch('categoryId')
  const watchType = watch('type')
  const watchPrice = watch('price')
  const watchExchangeText = watch('exchangeText')
  const watchImages = watch('images')

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
    const isValidType =
      watchType === StuffTalentType.SELL
        ? !!watchPrice && watchPrice > 0
        : watchType === StuffTalentType.EXCHANGE
        ? !!watchExchangeText
        : !!watchType

    return isValid && isValidType
  }, [isValid, watchType, watchPrice, watchExchangeText])

  const isSubmitCompleted = useRef(false)

  const onSubmit = handleSubmit(async (form) => {
    executeWithError(async () => {
      await store.insertItem(form)

      isSubmitCompleted.current = true
      routeList()
    })
  })

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    // TODO 임시저장 루틴을 통일하자 - 물건, 재능, 이야기 등
    if (isSubmitCompleted.current) return

    store.resetForm()

    // TODO 임시저장할 조건 확인 필요
    const [title, content, images] = getValues(['title', 'content', 'images'])

    if (title || content || images?.length) {
      store.setForm(getValues())
      console.log('cleanup', '임시저장 완료')
    }
  })

  useEffect(
    () => {
      if (watchType === StuffTalentType.SHARE || watchType === StuffTalentType.WANT) {
        setValueCustom('exchangeText', undefined)
        setValueCustom('price', undefined)
      } else if (watchType === StuffTalentType.SELL) {
        setValueCustom('exchangeText', undefined)
      } else if (watchType === StuffTalentType.EXCHANGE) {
        setValueCustom('price', undefined)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watchType]
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
            <input type='hidden' {...register('images', { required: false })} />
            <input type='hidden' {...register('categoryId', { required: true })} />

            <ImageUploader
              className='mb-6'
              images={watchImages}
              setImages={(param) => setValueCustom('images', param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>
            <div className='w-full'>
              <Radio
                items={typeLabels}
                selected={watchType ?? ''}
                setSelected={(type) => {
                  setValueCustom('type', type as StuffTalentType)
                }}
              ></Radio>
            </div>
            <Pad className='h-5'></Pad>
            <CategorySelector
              categories={store.categories}
              selectedId={watchCategoryId}
              onSelect={(id: number) => {
                setValueCustom('categoryId', id)
              }}
            />

            <InputNormal placeholder='제목' register={register('title', { required: true })}></InputNormal>
            <InputNormal
              hidden={watchType !== StuffTalentType.SELL}
              type='number'
              placeholder='원하시는 가격을 적어주세요'
              register={register('price')}
            ></InputNormal>
            <InputNormal
              hidden={watchType !== StuffTalentType.EXCHANGE}
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
