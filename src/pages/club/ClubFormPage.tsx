import { IonContent, IonFooter, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { Checkbox } from '../../components/atoms/CheckboxComponent'
import { Icon } from '../../components/atoms/IconComponent'
import { InputNormal } from '../../components/atoms/InputNormalComponent'
import { Textarea } from '../../components/atoms/TextareaComponent'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { IImageUploaderRef, ImageUploader } from '../../components/molecules/ImageUploaderComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'

export const ClubFormPage: React.FC = () => {
  const { $ui, $club } = useStore()
  const uploader = useRef<IImageUploaderRef>()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  const insertClub = () => {
    $club.insertClub($club.form)
  }

  return useObserver(() => (
    <IonPage>
      <Header>
        <div slot='start' className='text-header'>
          <BackButton></BackButton>
        </div>
        <div className='text-header text-center'>소모임</div>
        <div slot='end' onClick={() => insertClub()}>
          완료
        </div>
      </Header>
      <IonContent>
        <div className='px-container py-5'>
          <ImageUploader
            className='mb-6'
            images={$club.form.images}
            setImages={(param) => $club.setFormImage(param)}
            refUploader={uploader as IImageUploaderRef}
          ></ImageUploader>
          <InputNormal
            value={$club.form.name}
            placeholder='모임 이름'
            onChange={(name) => $club.setForm({ name })}
          ></InputNormal>
          <InputNormal
            value={$club.form.meetingTime}
            placeholder='모임 시간'
            onChange={(meetingTime) => $club.setForm({ meetingTime })}
          ></InputNormal>
          <InputNormal
            value={$club.form.meetingPlace}
            placeholder='모임 장소'
            onChange={(meetingPlace) => $club.setForm({ meetingPlace })}
          ></InputNormal>
          <Textarea
            value={$club.form.description}
            onChange={(description) => $club.setForm({ description })}
            rows={10}
            placeholder='소모임을 자유롭게 소게해주세요 :)'
          ></Textarea>
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
