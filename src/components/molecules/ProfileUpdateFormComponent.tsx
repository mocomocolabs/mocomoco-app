import { useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../hooks/use-store'
import { IUser } from '../../models/user'
import { Spinner } from '../atoms/SpinnerComponent'
import { ProfileUpdateInput } from './ProfileUpdateInputComponent'

interface IProfileUpdate {
  userId: number
  handleSubmitAvailable: (isValid: boolean) => void
}

export const ProfileUpdateForm: React.FC<IProfileUpdate> = ({ userId, handleSubmitAvailable }) => {
  const { $ui, $user } = useStore()
  const history = useHistory()
  const methods = useForm<IUser>({
    mode: 'onChange',
  })

  const submitAvailable = useMemo(() => methods.formState.isDirty && methods.formState.isValid, [
    methods.formState.isDirty,
    methods.formState.isValid,
  ])

  useLayoutEffect(() => {
    handleSubmitAvailable(submitAvailable)
  }, [submitAvailable, handleSubmitAvailable])

  useIonViewWillEnter(() => {
    // Submit-button's "disabled" is set as formState.isDirty value.
    // From 2nd entering into the ProfileUpdateInput component,
    // custom fields - emailOpen & mobileOpen - are always set to dirty.
    // It is a behavior of react-hook-form.
    // So, required to reset formState.dirty fields.
    methods.reset()
  })

  // TODO validate data : react-hook-form 에서 data 변경여부 확인 어떻게 하는지?
  // 1) how to set a validate function?

  // 2) required to type-checking for all values.
  // input element values can be string only...-_-

  // type of id is number but actual value is string type
  // parseInt don't allow number type argument
  const onSubmit = (data: IUser) => {
    $ui.showAlert({
      isOpen: true,
      message: '프로필을 변경하시겠습니까?',
      onSuccess: async () => {
        await $user.updateUser(userId, data).then((success) => {
          if (success) {
            history.goBack()
          }
        })
      },
    })
  }

  // eslint-disable-next-line
  const observableTaskGroup = TaskGroup<any[], void | boolean>([$user.getUser, $user.updateUser])

  useEffect(() => {
    $user.getUser(userId)
  }, [$user, userId])

  // TODO performance check - render 횟수 등
  return useObserver(() =>
    observableTaskGroup.match({
      pending: () => {
        return <Spinner isFull={true}></Spinner>
      },
      resolved: () => {
        return (
          <FormProvider {...methods}>
            <form
              className='flex-col w-full my-4'
              id='profile-form'
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <ProfileUpdateInput user={$user.user} />
            </form>
          </FormProvider>
        )
      },
    })
  )
}
