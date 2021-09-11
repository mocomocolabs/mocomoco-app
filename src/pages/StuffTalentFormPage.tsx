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
import { ValidationMessage } from '../components/atoms/ValidationMessageComponent'
import { XDivider } from '../components/atoms/XDividerComponent'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { CategorySelector } from '../components/molecules/CategorySelectorComponent'
import { IImageUploaderRef, ImageUploader } from '../components/molecules/ImageUploaderComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { getPageKey, routeFunc, typeLabels } from '../models/stufftalent'
import { IStuffTalentForm, StuffTalentPageKey, StuffTalentType } from '../models/stufftalent.d'
import { IRouteParam, route } from '../services/route-service'
import { StuffTalentStore } from '../stores/stufftalent-store'
import { maxLengthValidator, minMaxNumberValidator } from '../utils/form-util'
import { executeWithError } from '../utils/http-helper-util'

export const StuffTalentFormPage: React.FC = () => {
  const goDetailOnSubmit = useHistory<IRouteParam>().location.state?.goDetailOnSubmit

  const { $ui, $stuff, $talent, $auth } = useStore()

  interface IPageData {
    [key: string]: {
      store: StuffTalentStore
      title: string
    }
  }
  const pageData: IPageData = {
    [StuffTalentPageKey.STUFF]: { store: $stuff, title: '물건창고' },
    [StuffTalentPageKey.TALENT]: { store: $talent, title: '재능창고' },
  }

  const { store, title } = pageData[getPageKey(useLocation().pathname)]
  const { routeDetail } = routeFunc[store.predefined.pageKey]

  const uploader = useRef<IImageUploaderRef>()

  const isUpdate = !!store.updateForm.id
  const init = Object.assign({}, isUpdate ? { ...store.updateForm } : { ...store.form })

  const {
    formState: { isValid, dirtyFields, errors },
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<IStuffTalentForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      ...init,
      // TODO 최종적으로는 $community.selectedId 를 사용하는 게 맞는데, 지금은 내 공동체에만 글을 쓸 수 있으니 auth.user.communityId를 사용하도록 함.
      communityId: init.communityId > 0 ? init.communityId : $auth.user.communityId,
    },
  })

  const [watchCategoryId, watchType, watchPrice, watchExchangeText, watchImages] = watch([
    'categoryId',
    'type',
    'price',
    'exchangeText',
    'images',
  ])

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
  }, [isValid, watchType, watchPrice, watchExchangeText, Object.keys(dirtyFields).length])

  const isSubmitCompleted = useRef(false)

  const onSubmit = handleSubmit(async (form) => {
    executeWithError(async () => {
      const { id } = await store.insertItem(form, isUpdate)

      isUpdate ? store.resetUpdateForm() : store.resetForm()

      isSubmitCompleted.current = true

      goDetailOnSubmit ? routeDetail(id, true) : route.goBack()
    })
  })

  const SubmitBtn = useMemo(
    () => <HeaderSubmitText isSubmittable={submittable} onSubmit={onSubmit} />,
    [submittable, onSubmit]
  )

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
      !!watchExchangeText && setValueCustom('exchangeText', '')
      !!watchPrice && setValueCustom('price', 0)
    } else if (StuffTalentType.SELL === watchType) {
      !!watchExchangeText && setValueCustom('exchangeText', '')
    } else if (StuffTalentType.EXCHANGE === watchType) {
      !!watchPrice && setValueCustom('price', 0)
    }
  }, [watchType])

  return (
    <IonPage>
      <Header
        start={<BackButton type='close' />}
        center={title}
        end={<SpinnerWrapper task={store.insertItem} Submit={SubmitBtn} />}
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
            {/* 
            react-hook-form 구현상 number타입 필드의 빈값 처리 문제가 있다.
            이를 피하기 위해, price 필드는 폼값을 가지는 input과 화면에 표시할 input을 별개도 두고 필요한 처리를 한다.
            자세한 내용은 issue.md를 참고하자.
            */}
            <input
              type='hidden'
              {...register('price', {
                required: watchType === StuffTalentType.SELL,
                validate: (value) => {
                  if (value === 0) {
                    return watchType !== StuffTalentType.SELL || '가격을 입력해주세요'
                  }

                  return minMaxNumberValidator(value, 1, 99999999999)
                },
                valueAsNumber: true,
              })}
            />

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
                defaultChecked={init.isExchangeable}
                onChange={(checked) => setValueCustom('isExchangeable', checked)}
                color='primary'
              ></Checkbox>
              <Checkbox
                label='가격제안 가능'
                defaultChecked={init.isNegotiable}
                onChange={(checked) => setValueCustom('isNegotiable', checked)}
                color='primary'
              ></Checkbox>
            </div>

            <XDivider className='hr-gray mt-4' />

            <InputNormal
              placeholder='제목을 입력해주세요'
              register={register('title', {
                required: true,
                validate: (value) => maxLengthValidator(value, 100),
              })}
            />
            <ValidationMessage message={errors.title?.message} />

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
                placeholder='원하시는 가격을 적어주세요'
                type='text'
                value={watchPrice || ''}
                onChange={(value) => setValueCustom('price', value || 0)}
              />
              <ValidationMessage message={errors.price?.message} />
            </div>

            <div hidden={watchType !== StuffTalentType.EXCHANGE}>
              <InputNormal
                placeholder='무엇과 교환하고 싶으신가요?'
                register={register('exchangeText', {
                  required: watchType === StuffTalentType.EXCHANGE,
                  validate: (value) => maxLengthValidator(value, 100),
                })}
              />
              <ValidationMessage message={errors.exchangeText?.message} />
            </div>

            <Textarea
              rows={10}
              autoGrow={true}
              placeholder={`새롭게 활용될 곳을 찾을 수 있도록 자세히 소개해주세요 :)`}
              register={register('content', {
                required: true,
                validate: (value) => maxLengthValidator(value, 1000),
              })}
            />
            <ValidationMessage message={errors.content?.message} />
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
          label='모든 마을에 보이기'
          defaultChecked={init.isPublic}
          onChange={(checked) => setValueCustom('isPublic', checked)}
        />
        <IsPublicToast />
      </Footer>
    </IonPage>
  )
}
