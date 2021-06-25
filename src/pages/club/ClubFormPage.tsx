import { IonContent, IonFooter, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '../../components/atoms/CheckboxComponent'
import { Icon } from '../../components/atoms/IconComponent'
import { InputNormal } from '../../components/atoms/InputNormalComponent'
import { Textarea } from '../../components/atoms/TextareaComponent'
import { SpinnerWrapper } from '../../components/helpers/SpinnerWrapper'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { Hashtag } from '../../components/molecules/HashtagComponent'
import { IImageUploaderRef, ImageUploader } from '../../components/molecules/ImageUploaderComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'
import { IClubForm } from '../../models/club.d'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'

export const ClubFormPage: React.FC = () => {
  const { $ui, $club, $community } = useStore()
  const { register, handleSubmit, formState } = useForm<IClubForm>({
    mode: 'onChange',
    defaultValues: {
      ...$club.form,
    },
  })

  const uploader = useRef<IImageUploaderRef>()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  // TODO: 데이터 변경이 있을 때만 완료 버튼 활성화되도록 조건 추가되면 좋을 것 같네요
  // => 저는 기본값과 비교해서 수정된 값 있는지 확인하려고 dirtyFields를 활용했는데, 다른 방법이 있을 수도 있겠네요
  // => formState.isValid && Object.keys(formState.dirtyFields).length > 0
  const onSubmit = handleSubmit(async (form) => {
    $club.setForm(form)
    executeWithError(async () => {
      await $club.insertClub({
        ...$club.form,
        communityId: $community.selectedId,
      })
      route.clubs()
    })
  })

  return useObserver(() => (
    <IonPage>
      <Header>
        <div slot='start' className='text-header'>
          <BackButton type='close'></BackButton>
        </div>
        <div className='text-header text-center'>소모임</div>

        <div slot='end'>
          <SpinnerWrapper
            task={$club.insertClub}
            Submit={() => (
              <div className={formState.isValid ? '' : 'gray'} slot='end' onClick={() => onSubmit()}>
                완료
              </div>
            )}
          ></SpinnerWrapper>
        </div>
      </Header>
      <IonContent>
        <div className='px-container py-5'>
          <form onSubmit={onSubmit}>
            <ImageUploader
              className='mb-6'
              images={$club.form.images}
              setImages={(param) => $club.setFormImage(param)}
              refUploader={uploader as IImageUploaderRef}
            ></ImageUploader>
            <InputNormal
              placeholder='모임 이름'
              register={register('name', { required: true })}
            ></InputNormal>
            <InputNormal
              placeholder='모임 시간'
              register={register('meetingTime', { required: true })}
            ></InputNormal>
            <InputNormal
              placeholder='모임 장소'
              register={register('meetingPlace', { required: true })}
            ></InputNormal>
            <Hashtag
              onChange={(hashtagNames) => $club.setForm({ hashtagNames })}
              value={$club.form.hashtagNames?.join(' ')}
            ></Hashtag>
            <Textarea
              rows={10}
              placeholder='소모임을 자유롭게 소개해주세요 :)'
              register={register('description', { required: true })}
            ></Textarea>
          </form>
        </div>
      </IonContent>
      <IonFooter>
        <div className='px-container flex-between-center height-56 shadow-sm'>
          {/* TODO: 카메라 플러그인 추가 */}
          <Icon
            name={$club.form.images.length ? 'image-solid' : 'image'}
            className='icon-primary'
            onClick={() => uploader.current?.click()}
          ></Icon>
          <Checkbox
            label='전체 공개'
            defaultChecked={$club.form.isPublic!}
            onChange={(checked) => $club.setForm({ isPublic: checked })}
          ></Checkbox>
        </div>
      </IonFooter>
    </IonPage>
  ))
}
