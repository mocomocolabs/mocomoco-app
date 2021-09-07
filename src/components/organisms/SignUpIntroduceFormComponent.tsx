import { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { ISignUpForm } from '../../models/sign-up'
import { route } from '../../services/route-service'
import { maxLengthValidator } from '../../utils/form-util'
import { executeWithError } from '../../utils/http-helper-util'
import { Pad } from '../atoms/PadComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { Textarea } from '../atoms/TextareaComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'

export const SignUpIntroduceForm: FC = () => {
  const { $auth } = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<ISignUpForm>({
    mode: 'onChange',
    defaultValues: { introduce: '', ...$auth.signUpForm },
  })

  const isSubmitSuccessful = useRef(false)

  const onSubmit = handleSubmit(async (form) =>
    executeWithError(async () => {
      $auth.setSignUpForm(form)
      await $auth.signUp($auth.signUpForm)

      isSubmitSuccessful.current = true

      await $auth.signIn($auth.signUpForm.email!, $auth.signUpForm.password!)
      route.signUpComplete()
    })
  )

  useEffect(() => {
    const cleanUp = () => {
      isSubmitSuccessful.current ? $auth.resetSignUpForm() : $auth.setSignUpForm(getValues())
    }

    return cleanUp
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        register={register('introduce', {
          required: true,
          validate: (value) => maxLengthValidator(value, 100),
        })}
        placeholder='간단히 소개 부탁드려요. 마을을 돌보는 하마새에게 소개글이 전해져요.'
        rows={3}
      />

      <XDivider />

      <ValidationMessage message={errors.introduce?.message} />

      <Pad className='height-40' />

      <TaskObserver taskTypes={[$auth.signUp, $auth.signIn]} spinnerPosition='centerX'>
        {() => <SubmitButton color='secondary' size='large' disabled={!isValid} text='회원가입 완료하기' />}
      </TaskObserver>
    </form>
  )
}
