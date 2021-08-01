import { IonContent, IonPage } from '@ionic/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileUpdateFormComponent } from '../components/molecules/ProfileUpdateFormComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'

export const ProfileUpdatePage: React.FC = () => {
  const userId = parseInt(useParams<{ id: string }>().id)

  const { $ui, $user } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  const [submittable, setSubmittable] = useState(false)
  const onSubmittableChange = useCallback((available: boolean) => setSubmittable(available), [])

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <IonPage>
      <Header>
        <div slot='start'>
          <BackButton type='close' />
        </div>
        <div className='text-header absolute-center'>프로필 수정</div>
        <div slot='end'>
          <SpinnerWrapper
            task={$user.updateUser}
            Submit={
              <HeaderSubmitText
                isSubmittable={submittable}
                onSubmit={() => {
                  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                }}
              />
            }
          />
        </div>
      </Header>

      <IonContent>
        <div className='px-container flex-col items-center'>
          <ProfileUpdateFormComponent
            userId={userId}
            onSubmittableChange={onSubmittableChange}
            ref={formRef}
          />
        </div>
      </IonContent>
      {/* TODO 나중에 작업 - profileDetail로 넘어갈 때, user form값을 store에 저장해둬야 함
      <div className='px-container mb-5'>
        <SubmitButton
          text='미리보기'
          color='secondary'
          size='large'
          onClick={() => route.profileDetail(userId)}
        />
      </div> */}
    </IonPage>
  )
}
