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
import { IClubForm } from '../../models/club'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'

export const ClubFormPage: React.FC = () => {
  const { $ui, $club } = useStore()
  const { register, handleSubmit, errors, watch, formState } = useForm<IClubForm>({
    mode: 'onChange',
  })

  const uploader = useRef<IImageUploaderRef>()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  const onSubmit = handleSubmit(async (form) => {
    $club.setForm(form)
    executeWithError(async () => {
      await $club.insertClub($club.form)
      route.clubs()
    })
  })

  return useObserver(() => (
    <IonPage>
      <Header>
        <div slot='start' className='text-header'>
          <BackButton></BackButton>
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
              name='name'
              placeholder='모임 이름'
              register={register({ required: true })}
            ></InputNormal>
            <InputNormal
              name='meetingTime'
              placeholder='모임 시간'
              register={register({ required: true })}
            ></InputNormal>
            <InputNormal
              name='meetingPlace'
              placeholder='모임 장소'
              register={register({ required: true })}
            ></InputNormal>
            <Hashtag
              onChange={(hashtagNames) => $club.setForm({ hashtagNames })}
              value={$club.form.hashtagNames?.join(' ')}
            ></Hashtag>
            <Textarea
              name='description'
              rows={10}
              placeholder='소모임을 자유롭게 소게해주세요 :)'
              register={register({ required: true })}
            ></Textarea>
          </form>
        </div>
      </IonContent>
      <IonFooter>
        <div className='px-container flex-between-center height-56 shadow-sm'>
          {/* TODO: 카메라 플러그인 추가 */}
          <Icon
            name={$club.form.images.length ? 'image-solid' : 'image'}
            className='icon-yellow'
            onClick={() => uploader.current?.click()}
          ></Icon>
          <Checkbox
            label='전체 공개'
            onClick={() => $club.setForm({ isPublic: !$club.form.isPublic })}
            checked={$club.form.isPublic!}
          ></Checkbox>
        </div>
      </IonFooter>
    </IonPage>
  ))
}
