import { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { ISignUpForm } from '../../models/sign-up'
import { route } from '../../services/route-service'
import { InputNormal } from '../atoms/InputNormalComponent'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'

export const SignUpForm: FC = () => {
  const { $auth } = useStore()

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    trigger,
  } = useForm<ISignUpForm>({
    mode: 'onChange',
    defaultValues: { ...$auth.signUpForm },
  })

  const isSubmitSuccessful = useRef(false)

  const onSubmit = handleSubmit(async (form) => {
    $auth.setSignUpForm(form)
    isSubmitSuccessful.current = true

    route.signUpCommunity()
  })

  useEffect(() => {
    const cleanUp = () => {
      !isSubmitSuccessful.current && $auth.resetSignUpForm()
    }

    return cleanUp
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <InputNormal
        placeholder='이름을 입력해주세요'
        register={register('name', {
          required: '이름을 입력해주세요',
          minLength: { value: 2, message: '2~6글자 사이로 입력해주세요' },
          maxLength: { value: 6, message: '2~6글자 사이로 입력해주세요' },
        })}
      />
      <ValidationMessage message={errors.name?.message} keepSpace />

      <InputPassword
        placeholder='비밀번호를 입력해주세요'
        onChange={() => getValues('rePassword') && trigger('rePassword')}
        register={register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 6, message: '6~32글자 사이로 입력해주세요' },
          maxLength: { value: 32, message: '6~32글자 사이로 입력해주세요' },
        })}
      />
      <ValidationMessage message={errors.password?.message} keepSpace />

      <InputPassword
        placeholder='비밀번호를 확인해주세요'
        register={register('rePassword', {
          required: '비밀번호를 입력해주세요',
          // 'password'값이 변경되면 'rePassword'의 validate가 호출되는데
          // getValues('password) 를 사용해야만 최신값을 읽어올 수 있다.
          validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
        })}
      />
      <ValidationMessage message={errors.rePassword?.message} className='height-40' keepSpace />

      <SubmitButton color='secondary' size='large' disabled={!isValid} text='계속하기' />
    </form>
  )
}
