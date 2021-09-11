import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { HeaderSubmitText } from '../../components/atoms/HeaderSubmitText'
import { Icon } from '../../components/atoms/IconComponent'
import { InputNormal } from '../../components/atoms/InputNormalComponent'
import { Pad } from '../../components/atoms/PadComponent'
import { Textarea } from '../../components/atoms/TextareaComponent'
import { ValidationMessage } from '../../components/atoms/ValidationMessageComponent'
import { SpinnerWrapper } from '../../components/helpers/SpinnerWrapper'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { Hashtag } from '../../components/molecules/HashtagComponent'
import { IImageUploaderRef, ImageUploader } from '../../components/molecules/ImageUploaderComponent'
import { Footer } from '../../components/organisms/FooterComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'
import { IClubForm } from '../../models/club.d'
import { IRouteParam, route } from '../../services/route-service'
import { maxLengthValidator } from '../../utils/form-util'
import { executeWithError } from '../../utils/http-helper-util'

export const ClubFormPage: React.FC = () => {
  const goDetailOnSubmit = useHistory<IRouteParam>().location.state?.goDetailOnSubmit

  const { $auth, $ui, $club, $chat } = useStore()

  const uploader = useRef<IImageUploaderRef>()

  const isUpdate = !!$club.updateForm.id
  const init = Object.assign({}, isUpdate ? { ...$club.updateForm } : { ...$club.form })

  const {
    register,
    handleSubmit,
    formState: { isValid, dirtyFields, errors },
    getValues,
    setValue,
    watch,
  } = useForm<IClubForm>({
    mode: 'onChange',
    defaultValues: {
      ...init,
      // TODO 최종적으로는 $community.selectedId 를 사용하는 게 맞는데, 지금은 내 공동체에만 글을 쓸 수 있으니 auth.user.communityId를 사용하도록 함.
      communityId: init.communityId > 0 ? init.communityId : $auth.user.communityId,
    },
  })

  const [watchImages, watchHashtagNames] = watch(['images', 'hashtagNames'])

  const setValueCustom = useCallback((name, value) => {
    // shouldTouch: true 설정하면, checkbox값이 변경되어도 dirtyFields에 포함되지 않는다. 이유는 모름.
    setValue(name, value, { shouldDirty: true, shouldValidate: true })
  }, [])

  const submittable = useMemo(() => {
    const isChangedFromDefaultValues = Object.keys(dirtyFields).length > 0

    return isValid && !(isUpdate && !isChangedFromDefaultValues)
  }, [isValid, Object.keys(dirtyFields).length])

  const isSubmitCompleted = useRef(false)

  const onSubmit = handleSubmit(async (form) => {
    executeWithError(async () => {
      const club = await $club.insertClub(form, isUpdate)

      isUpdate ? $club.resetUpdateForm() : $club.resetForm()

      // TODO isUpdate && 소모임채팅방의 데이터를 업뎃해줘야 함
      !isUpdate && $chat.subscribeNewRoom(club.chatroom.id)

      isSubmitCompleted.current = true

      goDetailOnSubmit ? route.clubDetail(club.id!, true) : route.goBack()
    })
  })

  const SubmitBtn = useMemo(
    () => <HeaderSubmitText isSubmittable={submittable} onSubmit={onSubmit} />,
    [submittable, onSubmit]
  )

  useEffect(() => {
    $ui.setIsBottomTab(false)

    return () => {
      isUpdate ? $club.resetUpdateForm() : $club.resetForm()

      // TODO 임시저장 루틴을 통일하자 - 물건, 재능, 이야기 등
      if (isUpdate || isSubmitCompleted.current) return

      const [name, description, images] = getValues(['name', 'description', 'images'])

      if (name || description || images?.length) {
        $club.setForm(getValues())
        console.log('cleanup', '임시저장 완료')
      }
    }
  }, [])

  return useObserver(() => (
    <IonPage>
      <Header
        start={<BackButton type='close' />}
        center='소모임'
        end={<SpinnerWrapper task={$club.insertClub} Submit={SubmitBtn} />}
      />

      <IonContent>
        <div className='px-container'>
          <form id='club-form' onSubmit={onSubmit}>
            <input type='hidden' {...register('id')} />
            <input type='hidden' {...register('images')} />
            <input type='hidden' {...register('hashtagNames')} />
            {/* <input type='hidden' {...register('isPublic')} /> */}

            <ImageUploader
              className='mt-5'
              images={watchImages}
              setImages={(param) => setValueCustom('images', param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>

            <Pad className='h-2' />

            <InputNormal
              placeholder='모임의 이름을 입력해주세요'
              register={register('name', {
                required: true,
                validate: (value) => maxLengthValidator(value, 100),
              })}
            />
            <ValidationMessage message={errors.name?.message} />

            <InputNormal
              placeholder='모임 시간 (예: 매주 수요일 12:00)'
              register={register('meetingTime', {
                required: true,
                validate: (value) => maxLengthValidator(value, 100),
              })}
            />
            <ValidationMessage message={errors.meetingTime?.message} />

            <InputNormal
              placeholder='모임 장소'
              register={register('meetingPlace', {
                required: true,
                validate: (value) => maxLengthValidator(value, 100),
              })}
            />
            <ValidationMessage message={errors.meetingPlace?.message} />

            {/* TODO validate: (value) => maxLengthValidator(value, 100), */}
            <Hashtag
              onChange={(hashtagNames) => setValueCustom('hashtagNames', hashtagNames)}
              value={watchHashtagNames.join(' ')}
            />

            <Textarea
              rows={10}
              autoGrow={true}
              placeholder='소모임을 자유롭게 소개해주세요 :)'
              register={register('description', {
                required: true,
                validate: (value) => maxLengthValidator(value, 1000),
              })}
            />
            <ValidationMessage message={errors.description?.message} />
          </form>
        </div>
      </IonContent>
      <Footer>
        {/* TODO: 카메라 플러그인 추가 */}
        <Icon
          name={watchImages.length ? 'image-solid' : 'image'}
          className='icon-secondary'
          onClick={() => uploader.current?.click()}
        />
        {/* TODO 소모임은 현재, 모든 공동체 보기가 없기 때문에 전체 공개 체크박스도 막아두는 게 일관성있겠다.
          <Checkbox
            label='모든 마을에 보이기'
            defaultChecked={init.isPublic!}
            onChange={(checked) => setValueCustom('isPublic', checked)}
          />
          <IsPublicToast /> */}
      </Footer>
    </IonPage>
  ))
}
