import { forwardRef, useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { IUser } from '../../models/user.d'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { ProfileUpdateInput } from './ProfileUpdateInputComponent'
import { TaskObserver } from './TaskObserverComponent'

interface IProfileUpdateForm {
  userId: number
  onSubmittableChange: (available: boolean) => void
}

export const ProfileUpdateFormComponent = forwardRef<HTMLFormElement, IProfileUpdateForm>(
  ({ userId, onSubmittableChange: setSubmittable }, ref) => {
    const { $ui, $user } = useStore()

    const {
      formState: { isValid, dirtyFields },
      handleSubmit,
      register,
      setValue,
      watch,
    } = useForm<IUser>({
      mode: 'onChange',
      defaultValues: { ...$user.user },
    })

    const submittable = useMemo(() => {
      return isValid && Object.keys(dirtyFields).length > 0
    }, [isValid, dirtyFields, Object.keys(dirtyFields).length])

    useEffect(() => {
      setSubmittable(submittable)
    }, [setSubmittable, submittable])

    const onSubmit = useCallback(
      (user: IUser) => {
        $ui.showAlert({
          message: '프로필을 변경하시겠습니까?',
          onSuccess: () =>
            executeWithError(() =>
              $user
                .updateUser(
                  // dirtyFields를 참고해서, 변경된 프로퍼티만 남김
                  Object.fromEntries(
                    Object.entries(user).filter(([key]) => {
                      return key === 'id' || Object.keys(dirtyFields).includes(key)
                    })
                  ) as IUser
                )
                .then((success) => {
                  if (success) {
                    route.goBack()
                  }
                })
            ),
        })
      },
      [$ui, $user]
    )

    useEffect(() => {
      $user.getUser(userId)
    }, [$user, userId])

    // TODO performance check - render 횟수 등
    return (
      <form className='flex-col w-full my-4' id='profile-form' ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <TaskObserver taskTypes={($user.getUser, $user.updateUser)} spinnerPosition='center'>
          {() => <ProfileUpdateInput fields={{ register, setValue, watch }} />}
        </TaskObserver>
      </form>
    )
  }
)
