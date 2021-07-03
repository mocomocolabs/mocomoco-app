import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { IUser } from '../../models/user'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { Spinner } from '../atoms/SpinnerComponent'
import { ProfileUpdateInput } from './ProfileUpdateInputComponent'

interface IProfileUpdateForm {
  userId: number
  onSubmittableChange: (available: boolean) => void
}

export const ProfileUpdateFormComponent: React.FC<IProfileUpdateForm> = ({
  userId,
  onSubmittableChange: setSubmittable,
}) => {
  const { $ui, $user } = useStore()

  const {
    formState: { isValid, dirtyFields, errors },
    reset,
    handleSubmit,
    control,
    register,
    getValues,
  } = useForm<IUser>({
    mode: 'onChange',
  })

  useEffect(() => {
    // react-hook-form의 dirtyFields가 정상적으로 동작하려면,
    // 제공하는 api를 이용해서 default value 값들을 설정해 줘야 함.
    // 1. useForm 호출 시 defaultValues 프로퍼티 설정하거나,
    // 2. reset() 호출해서 default value를 재설정하기
    //
    // 이렇게 하지 않고, input 필드에 직접 defaultValue를 지정할 경우에는
    // 필드를 한 번 클릭만 해도 dirtyFields에 포함되며, 다시 원래 값으로 돌려놔도
    // dirtyFields에서 제외되지 않고 계속 남아 있음.
    reset({ ...$user.user }, { keepDefaultValues: false })
  }, [reset, $user.user])

  const submittable = useMemo(
    () => isValid && Object.keys(dirtyFields).length > 0,

    [isValid, dirtyFields, Object.keys(dirtyFields).length]
  )

  useEffect(() => {
    setSubmittable(submittable)
  }, [setSubmittable, submittable])

  const onSubmit = useCallback(
    (user: IUser) => {
      $ui.showAlert({
        isOpen: true,
        message: '프로필을 변경하시겠습니까?',
        onSuccess: () =>
          executeWithError(() =>
            $user.updateUser(user).then((success) => {
              if (success) {
                route.goBack()
              }
            })
          ),
      })
    },
    [$ui, $user]
  )

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
          <form className='flex-col w-full my-4' id='profile-form' onSubmit={handleSubmit(onSubmit)}>
            <ProfileUpdateInput fields={{ control, errors, register, getValues }} />
          </form>
        )
      },
    })
  )
}
