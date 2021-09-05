import { useObserver } from 'mobx-react-lite'
import { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { ISignUpForm } from '../../models/sign-up'
import { route } from '../../services/route-service'
import { InputNormal } from '../atoms/InputNormalComponent'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { Pad } from '../atoms/PadComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { FieldErrorMessage } from '../molecules/FieldErrorMessageComponent'

export const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    formState,
  } = useForm<ISignUpForm>({
    mode: 'onChange',
  })
  const password = useRef({})
  password.current = watch('password', '')

  const { $auth } = useStore()

  const onSubmit = handleSubmit(async (form) => {
    $auth.setSignUpForm(form)

    route.signUpCommunity()
  })

  return useObserver(() => (
    <form onSubmit={onSubmit}>
      <InputNormal
        placeholder='이름을 입력해주세요'
        register={register('name', {
          required: '이름을 입력해주세요',
          minLength: { value: 2, message: '2~6글자 사이로 입력해주세요' },
          maxLength: { value: 6, message: '2~6글자 사이로 입력해주세요' },
        })}
      />
      <FieldErrorMessage error={errors.name} />
      {/* <InputNormal placeholder='별명을 입력해주세요(선택)' register={register('nickname')}></InputNormal>
      <Pad className='height-20'></Pad> */}
      <InputPassword
        placeholder='비밀번호를 입력해주세요'
        register={register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 6, message: '6~32글자 사이로 입력해주세요' },
          maxLength: { value: 32, message: '6~32글자 사이로 입력해주세요' },
        })}
      />
      <FieldErrorMessage error={errors.password} />
      <InputPassword
        placeholder='비밀번호를 확인해주세요'
        register={register('rePassword', {
          required: '비밀번호를 입력해주세요',
          validate: (value) => value === password.current || '비밀번호가 일치하지 않습니다',
        })}
      />
      <FieldErrorMessage error={errors.rePassword} />
      <Pad className='height-20' />
      <SubmitButton color='secondary' size='large' disabled={!formState.isValid} text='계속하기' />
    </form>
  ))
}
