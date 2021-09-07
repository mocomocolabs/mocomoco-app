import { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'

export const SignInEmail: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    formState,
  } = useForm<{ email: string; password: string }>({
    mode: 'onChange',
  })
  const password = useRef({})
  password.current = watch('password', '')

  const { $auth } = useStore()

  useEffect(() => {
    if (!$auth.signUpForm.email) {
      route.signUp()
    }
  }, [])

  const onSubmit = handleSubmit((form) => {
    executeWithError(() => $auth.signIn($auth.signUpForm.email!, form.password))
  })

  return (
    <form onSubmit={onSubmit}>
      <InputPassword
        placeholder='비밀번호를 입력해주세요'
        register={register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 6, message: '6~32자 사이로 입력해주세요' },
          maxLength: { value: 32, message: '6~32자 사이로 입력해주세요' },
        })}
      />
      <ValidationMessage message={errors.password?.message} className='height-40' keepSpace />

      <SpinnerWrapper
        task={$auth.signIn}
        spinnerPosition='centerX'
        Submit={<SubmitButton disabled={!formState.isValid} text='로그인' size='large' color='secondary' />}
      />
    </form>
  )
}
