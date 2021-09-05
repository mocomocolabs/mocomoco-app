import { IonContent, IonPage } from '@ionic/react'
import { Observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import { Checkbox } from '../components/atoms/CheckboxComponent'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
import { Icon } from '../components/atoms/IconComponent'
import { InputNormal } from '../components/atoms/InputNormalComponent'
import { IsPublicToast } from '../components/atoms/IsPublicToast'
import { Pad } from '../components/atoms/PadComponent'
import { SquareWithCorner } from '../components/atoms/SquareWithCornerComponent'
import { Textarea } from '../components/atoms/TextareaComponent'
import { TextSm } from '../components/atoms/TextSmComponent'
import { XDivider } from '../components/atoms/XDividerComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CategorySelector } from '../components/molecules/CategorySelectorComponent'
import { FieldErrorMessage } from '../components/molecules/FieldErrorMessageComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { getPageKey, routeFunc, typeLabels } from '../models/stufftalent'
import { IStuffTalentForm, StuffTalentPageKey, StuffTalentType } from '../models/stufftalent.d'
import { IRouteParam, route } from '../services/route-service'
import { maxLengthValidator } from '../utils/form-util'
import { executeWithError } from '../utils/http-helper-util'

export const StuffTalentFormPage: React.FC = () => {
  const goDetailOnSubmit = useHistory<IRouteParam>().location.state?.goDetailOnSubmit

  const { $ui, $stuff, $talent, $auth } = useStore()

  const pageData = {
    [StuffTalentPageKey.STUFF]: { store: $stuff, title: '물건창고' },
    [StuffTalentPageKey.TALENT]: { store: $talent, title: '재능창고' },
  }

  const { store, title } = pageData[getPageKey(useLocation().pathname)]
  const { routeDetail } = routeFunc[store.predefined.pageKey]

  const isUpdate = !!store.updateForm.id
  const form = Object.assign({}, isUpdate ? { ...store.updateForm } : { ...store.form })

  const { formState, register, handleSubmit, getValues, setValue, watch } = useForm<IStuffTalentForm>({
    mode: 'onChange',
    // TODO 최종적으로는 $community.selectedId 를 사용하는 게 맞는데, 지금은 내 공동체에만 글을 쓸 수 있으니 auth.user.communityId를 사용하도록 함.
    defaultValues: { ...form, communityId: form.communityId > 0 ? form.communityId : $auth.user.communityId },
  })

  const { isValid, dirtyFields, errors } = formState

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

    return isValid && isValidType && !(isUpdate && !isChangedFromDefaultValues)
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

      goDetailOnSubmit ? routeDetail(form.id!, true) : route.goBack()
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
    // 불필요한 setValue 호출을 막기 위해 현재 빈 값인 필드는 그냥 둔다.
    if ([StuffTalentType.SHARE, StuffTalentType.WANT].includes(watchType)) {
      !!watchExchangeText && setValueCustom('exchangeText', undefined)
      !!watchPrice && setValueCustom('price', undefined)
    } else if (StuffTalentType.SELL === watchType) {
      !!watchExchangeText && setValueCustom('exchangeText', undefined)
    } else if (StuffTalentType.EXCHANGE === watchType) {
      !!watchPrice && setValueCustom('price', undefined)
    }
  }, [watchType])

  return (
    <IonPage>
      <Header
        start={<BackButton type='close' />}
        center={title}
        end={
          <SpinnerWrapper
            task={store.insertItem}
            Submit={<HeaderSubmitText isSubmittable={submittable} onSubmit={onSubmit} />}
          />
        }
      />
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
              className='mb-4'
              images={watchImages}
              setImages={(param) => setValueCustom('images', param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>

            <div className='flex gap-1 w-full'>
              {typeLabels.map((t, i) => (
                <div
                  key={i}
                  className='flex-grow'
                  onClick={() => setValueCustom('type', t.value as StuffTalentType)}
                >
                  <SquareWithCorner
                    height={32}
                    key={i}
                    color={t.value !== watchType ? 'gray' : undefined}
                    fill={t.value === watchType}
                  >
                    <TextSm className={`${t.value !== watchType ? 'gray' : undefined} leading-none`}>
                      {t.label}
                    </TextSm>
                  </SquareWithCorner>
                </div>
              ))}
            </div>

            <Pad className='h-4' />

            <div className='flex gap-4'>
              <Checkbox
                label='교환 가능'
                defaultChecked={form.isExchangeable}
                onChange={(checked) => setValueCustom('isExchangeable', checked)}
                color='primary'
              ></Checkbox>
              <Checkbox
                label='가격제안 가능'
                defaultChecked={form.isNegotiable}
                onChange={(checked) => setValueCustom('isNegotiable', checked)}
                color='primary'
              ></Checkbox>
            </div>

            <XDivider className='hr-gray mt-4' />

            <InputNormal
              placeholder='제목'
              register={register('title', {
                required: true,
                validate: (value) => maxLengthValidator(value, 100),
              })}
            />
            <FieldErrorMessage error={errors.title} />

            <Pad className='h-4' />

            <Observer>
              {() => (
                <CategorySelector
                  categories={store.categories}
                  selectedId={watchCategoryId}
                  onSelect={(id: number) => {
                    setValueCustom('categoryId', id)
                  }}
                />
              )}
            </Observer>

            <XDivider className='hr-gray mt-4' />

            <div hidden={watchType !== StuffTalentType.SELL}>
              <InputNormal
                type='number'
                placeholder='원하시는 가격을 적어주세요'
                register={register('price', {
                  min: { value: 1, message: '1~1000000000000 사이의 숫자를 입력해주세요' },
                  max: { value: 1000000000000, message: '1~1000000000000 사이의 숫자를 입력해주세요' },
                })}
              />
              <FieldErrorMessage error={errors.price} />
            </div>

            <div hidden={watchType !== StuffTalentType.EXCHANGE}>
              <InputNormal
                placeholder='무엇과 교환하고 싶으신가요?'
                register={register('exchangeText', {
                  validate: (value) => maxLengthValidator(value, 100),
                })}
              />
              <FieldErrorMessage error={errors.exchangeText} />
            </div>

            <Textarea
              rows={10}
              autoGrow={true}
              placeholder='물건/재능이 새로운 활용처를 찾을 수 있도록 자유롭게 소개해주세요 :)'
              register={register('content', {
                required: true,
                validate: (value) => maxLengthValidator(value, 1000),
              })}
            />
            <FieldErrorMessage error={errors.content} />
          </form>
        </div>
      </IonContent>
      <Footer>
        {/* TODO: 카메라 플러그인 추가 */}
        <Icon
          name={watchImages?.length ? 'image-solid' : 'image'}
          className='icon-secondary'
          onClick={() => uploader.current?.click()}
        ></Icon>
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
