import { IonContent, IonPage } from '@ionic/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DeepMap, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
import { SpinnerWrapper } from '../components/helpers/SpinnerWrapper'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileUpdateInput } from '../components/molecules/ProfileUpdateInputComponent'
import { TaskObserver } from '../components/molecules/TaskObserverComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { IUserForm } from '../models/user.d'
import { route } from '../services/route-service'
import { executeWithError } from '../utils/http-helper-util'

export const ProfileUpdatePage: React.FC = () => {
  const userId = parseInt(useParams<{ id: string }>().id)

  const { $ui, $user, $auth } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  const {
    formState: { isValid, dirtyFields, errors },
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
  } = useForm<IUserForm>({
    mode: 'onChange',
  })

  const [formReady, setFormReady] = useState(false)

  const getUpdateForm = async () => {
    setFormReady(false)

    await $user.getUpdateForm(userId)
    reset({ ...$user.updateForm }, { keepDefaultValues: false })

    setFormReady(true)
  }

  useEffect(() => {
    getUpdateForm()

    return () => {
      $user.getUpdateForm.reset()
      $user.resetUpdateForm()
    }
  }, [])

  const formRef = useRef<HTMLFormElement>(null)

  const submittable = useMemo(
    () => isValid && Object.keys(dirtyFields).length > 0,
    [isValid, dirtyFields, Object.keys(dirtyFields).length]
  )

  /**
  dirtyFields를 참고해서, 변경된 프로퍼티만 남김
  */
  function filterUpdatedFields<T>(form: T, dirtyFields: DeepMap<T, true>): T {
    return Object.fromEntries(
      Object.entries(form).filter(([key]) => {
        return key === 'id' || Object.keys(dirtyFields).includes(key) || key === 'image' // TODO 20210903-1 서버작업 완료되면 image는 지울 것
      })
    ) as T
  }

  const onSubmit = useCallback(
    async (form: IUserForm) => {
      const updatedFields = filterUpdatedFields(form, dirtyFields)

      if (updatedFields.nickname && (await $auth.checkNicknameExists(updatedFields.nickname))) {
        $ui.showToastError({ message: '이미 존재하는 별명입니다. 새로운 별명을 입력해주세요.' })
        return
      }

      $ui.showAlert({
        message: '프로필을 변경하시겠습니까?',
        onSuccess: () =>
          executeWithError(async () => {
            return $user.updateUser(updatedFields).then((success) => {
              if (success) {
                route.goBack()
              }
            })
          }),
      })
    },
    [dirtyFields]
  )

  return (
    <IonPage>
      <Header
        start={<BackButton type='close' />}
        center='프로필 수정'
        end={
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
        }
      />
      <IonContent>
        <div className='px-container flex-col items-center'>
          <form
            className='flex-col w-full my-4'
            id='profile-form'
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TaskObserver taskTypes={$user.getUpdateForm} spinnerPosition='center'>
              {() =>
                formReady ? <ProfileUpdateInput fields={{ register, setValue, watch, errors }} /> : <></>
              }
            </TaskObserver>
          </form>
        </div>
      </IonContent>
      {/* TODO 나중에 작업 - profileDetail로 넘어갈 때, user form값을 store에 저장해둬야 함 */}
      {/* <div className='px-container mb-5'>
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
