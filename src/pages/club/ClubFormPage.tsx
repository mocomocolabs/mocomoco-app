import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { HeaderSubmitText } from '../../components/atoms/HeaderSubmitText'
import { Icon } from '../../components/atoms/IconComponent'
import { InputNormal } from '../../components/atoms/InputNormalComponent'
import { Pad } from '../../components/atoms/PadComponent'
import { Textarea } from '../../components/atoms/TextareaComponent'
import { ValidationMessage } from '../../components/atoms/ValidationMessageComponent'
import { SpinnerWrapper } from '../../components/helpers/SpinnerWrapper'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { Hashtag } from '../../components/molecules/HashtagComponent'
import {
  assignPreview,
  IImageUploaderRef,
  ImageUploader,
} from '../../components/molecules/ImageUploaderComponent'
import { Footer } from '../../components/organisms/FooterComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'
import { IClubForm } from '../../models/club.d'
import { route } from '../../services/route-service'
import { maxLengthValidator } from '../../utils/form-util'
import { executeWithError } from '../../utils/http-helper-util'

export const ClubFormPage: React.FC = () => {
  const { $auth, $ui, $club, $chat } = useStore()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<IClubForm>({
    mode: 'onChange',
    defaultValues: {
      ...$club.form,
    },
  })

  const uploader = useRef<IImageUploaderRef>()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  // TODO: 데이터 변경이 있을 때만 완료 버튼 활성화되도록 조건 추가되면 좋을 것 같네요
  // => 저는 기본값과 비교해서 수정된 값 있는지 확인하려고 dirtyFields를 활용했는데, 다른 방법이 있을 수도 있겠네요
  // => formState.isValid && Object.keys(formState.dirtyFields).length > 0
  const onSubmit = handleSubmit(async (form) => {
    $club.setForm({
      ...form,
      images: $club.form.images,
    })

    executeWithError(async () => {
      const club = await $club.insertClub({
        ...$club.form,
        communityId: $auth.user.communityId,
      })

      $chat.subscribeNewRoom(club.chatroom.id)

      $club.resetForm()
      reset()

      await Promise.all([$club.getPopularClubs(999), $club.getRecentClubs()])

      route.clubs()
    })
  })

  return useObserver(() => (
    <IonPage>
      <Header
        start={<BackButton type='close' />}
        center='소모임'
        end={
          <SpinnerWrapper
            task={$club.insertClub}
            Submit={<HeaderSubmitText isSubmittable={isValid} onSubmit={onSubmit} />}
          />
        }
      />
      <IonContent>
        <div className='px-container'>
          <form onSubmit={onSubmit}>
            <ImageUploader
              className='mt-5'
              images={$club.form.images?.map((v, i) => assignPreview(v, i))}
              setImages={(param) => $club.setFormImage(param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>

            <Pad className='h-2'></Pad>

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
              onChange={(hashtagNames) => $club.setForm({ hashtagNames })}
              value={$club.form.hashtagNames?.join(' ')}
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
          name={$club.form.images.length ? 'image-solid' : 'image'}
          className='icon-secondary'
          onClick={() => uploader.current?.click()}
        ></Icon>
        {/* TODO 소모임은 현재, 모든 공동체 보기가 없기 때문에 전체 공개 체크박스도 막아두는 게 일관성있겠다.
          <Checkbox
            label='모든 마을에 보이기'
            defaultChecked={$club.form.isPublic!}
            onChange={(checked) => $club.setForm({ isPublic: checked })}
          ></Checkbox>
          <IsPublicToast /> */}
      </Footer>
    </IonPage>
  ))
}
