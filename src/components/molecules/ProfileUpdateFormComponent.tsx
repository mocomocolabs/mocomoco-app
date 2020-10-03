import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../hooks/use-store'
import { IUser } from '../../models/user'
import { Spinner } from '../atoms/SpinnerComponent'
import { ProfileUpdateInput } from './ProfileUpdateInputComponent'

interface IProfileUpdate {
  userId: number
}

export const ProfileUpdateForm: React.FC<IProfileUpdate> = ({ userId }) => {
  const { $ui, $user } = useStore()
  const history = useHistory()
  const initialValues: IUser = {} as IUser
  const methods = useForm<IUser>({
    defaultValues: initialValues,
    mode: 'onChange',
  })

  const onSubmit = (data: IUser) =>
    // TODO validate data : react-hook-form 에서 data 변경여부 확인 어떻게 하는지?
    // 1) how to set a validate function?

    // 2) required to type-checking for all values.
    // input element values can be string only...-_-

    // type of id is number but actual value is string type
    // parseInt don't allow number type argument

    {
      ;(async () => {
        await new Promise(() =>
          $ui.showAlert({
            isOpen: true,
            message: '프로필을 변경하시겠습니까?',
            onSuccess: async () => {
              data.id = +data.id
              await $user.updateUser(userId, data, history.goBack)
            },
          })
        )
      })()
    }

  const onInvalid = () => {
    new Promise(() => {
      alert('data invalidation failed')
    })
  }

  // eslint-disable-next-line
  const observableTaskGroup = TaskGroup<any[], void>([$user.getUser, $user.updateUser])

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
              onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
            >
              <ProfileUpdateInput user={$user.user} />
            </form>
          </FormProvider>
        )
      },
    })
  )
}
