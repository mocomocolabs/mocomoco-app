import { IonContent, IonFooter, IonPage } from '@ionic/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
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
import { getPageKey, routeFunc, typeLabels } from '../models/stufftalent'
import { IStuffTalentForm, StuffTalentPageKey, StuffTalentType } from '../models/stufftalent.d'
import { executeWithError } from '../utils/http-helper-util'

export const StuffTalentFormPage: React.FC = () => {
  const { $ui, $stuff, $talent, $community } = useStore()

  const pageData = {
    [StuffTalentPageKey.STUFF]: { store: $stuff, title: '물건창고' },
    [StuffTalentPageKey.TALENT]: { store: $talent, title: '재능창고' },
  }

  const { store, title } = pageData[getPageKey(useLocation().pathname)]
  const { routeList } = routeFunc[store.predefined.pageKey]

  const isUpdate = !!store.updateForm.id
  const form = Object.assign({}, isUpdate ? { ...store.updateForm } : { ...store.form })

  const {
    formState: { isValid, dirtyFields },
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<IStuffTalentForm>({
    mode: 'onChange',
    defaultValues: { ...form, communityId: form.communityId ?? $community.selectedId },
  })

  const [watchCategoryId, watchType, watchPrice, watchExchangeText, watchImages] = watch([
    'categoryId',
    'type',
    'price',
    'exchangeText',
    'images',
  ])

  const uploader = useRef<IImageUploaderRef>()

  const setValueCustom = useCallback((name, value) => {
    // shouldTouch: true 설정하면, checkbox값이 변경되어도 dirtyFields에 포함되지 않는다. 이유는 모름.
    setValue(name, value, { shouldDirty: true, shouldValidate: true })
  }, [])

  const submittable = useMemo(() => {
    const isValidType =
      watchType === StuffTalentType.SELL
        ? !!watchPrice && watchPrice > 0
        : watchType === StuffTalentType.EXCHANGE
        ? !!watchExchangeText
        : !!watchType

    const isChangedFromDefaultValues = Object.keys(dirtyFields).length > 0

    return isValid && isValidType && isChangedFromDefaultValues
  }, [isValid, watchType, watchPrice, watchExchangeText, Object.keys(dirtyFields)])

  const isSubmitCompleted = useRef(false)

  const onSubmit = handleSubmit(async (form) => {
    executeWithError(async () => {
      if (isUpdate) {
        await store.updateItem(form)
        store.resetUpdateForm()
      } else {
        await store.insertItem(form)
        store.resetForm()
      }

      isSubmitCompleted.current = true
      routeList()
    })
  })

  useEffect(() => {
    $ui.setIsBottomTab(false)

    return () => {
      isUpdate ? store.resetUpdateForm() : store.resetForm()

      // TODO 임시저장 루틴을 통일하자 - 물건, 재능, 이야기 등
      if (isUpdate || isSubmitCompleted.current) return

      // TODO 임시저장할 조건 확인 필요
      const [title, content, images] = getValues(['title', 'content', 'images'])

      if (title || content || images?.length) {
        store.setForm(getValues())
        console.log('cleanup', '임시저장 완료')
      }
    }
  }, [])

  useEffect(() => {
    const [exchangeText, price] = getValues(['exchangeText', 'price'])

    // 불필요한 setValue 호출을 막기 위해 현재 빈 값인 필드는 그냥 둔다.
    if ([StuffTalentType.SHARE, StuffTalentType.WANT].includes(watchType)) {
      !!exchangeText && setValueCustom('exchangeText', undefined)
      !!price && setValueCustom('price', undefined)
    } else if (StuffTalentType.SELL === watchType) {
      !!exchangeText && setValueCustom('exchangeText', undefined)
    } else if (StuffTalentType.EXCHANGE === watchType) {
      !!price && setValueCustom('price', undefined)
    }
  }, [watchType])

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
            Submit={<HeaderSubmitText isSubmittable={submittable} onSubmit={onSubmit} />}
          ></SpinnerWrapper>
        </div>
      </Header>
      <IonContent>
        <div className='px-container py-5'>
          <form id='stufftalent-form' onSubmit={onSubmit}>
            <input type='hidden' {...register('id')} />
            <input type='hidden' {...register('type', { required: true })} />
            <input type='hidden' {...register('images')} />
            <input type='hidden' {...register('categoryId', { required: true })} />
            <input type='hidden' {...register('isExchangeable')} />
            <input type='hidden' {...register('isNegotiable')} />
            <input type='hidden' {...register('isPublic')} />

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
                label='교환 가능'
                defaultChecked={form.isExchangeable}
                onChange={(checked) => setValueCustom('isExchangeable', checked)}
              ></Checkbox>
              <Checkbox
                label='가격제안 가능'
                defaultChecked={form.isNegotiable}
                onChange={(checked) => setValueCustom('isNegotiable', checked)}
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
            className='icon-primary'
            onClick={() => uploader.current?.click()}
          ></Icon>
          <Checkbox
            label='전체 공개'
            defaultChecked={form.isPublic}
            onChange={(checked) => setValueCustom('isPublic', checked)}
          ></Checkbox>
        </div>
      </IonFooter>
    </IonPage>
  )
}
