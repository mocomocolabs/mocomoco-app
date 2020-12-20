import { useObserver } from 'mobx-react-lite'
import React, { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { ISignUpForm } from '../../models/sign-up'
import { route } from '../../services/route-service'
import { InputNormal } from '../atoms/InputNormalComponent copy'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'

export const SignUpForm: FC = () => {
  const { register, handleSubmit, errors, watch, formState } = useForm<ISignUpForm>({
    mode: 'onChange',
  })
  const password = useRef({})
  password.current = watch('password', '')

  const { $auth } = useStore()

  const onSubmit = handleSubmit((form) => {
    $auth.setSignUpForm(form)
    $auth.signUp($auth.signUpForm).then(() => {
      route.feed()
    })
  })

  return useObserver(() => (
    <form onSubmit={onSubmit}>
      <InputNormal name='name' placeholder='이름' register={register({ required: true })}></InputNormal>
      <ValidationMessage isShow={errors.name} message='이름은 필수값입니다'></ValidationMessage>
      <InputNormal name='nickname' placeholder='별명(선택)' register={register}></InputNormal>
      <InputPassword
        name='password'
        placeholder='비밀번호'
        register={register({
          required: '패스워드를 입력해주세요',
          minLength: { value: 6, message: '6자 이상 입력해주세요' },
        })}
      ></InputPassword>
      <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>
      <InputPassword
        name='rePassword'
        placeholder='비밀번호 확인'
        register={register({
          required: '패스워드를 입력해주세요',
          validate: (value) => value === password.current || '패스워드가 일치하지 않습니다',
        })}
      ></InputPassword>
      <ValidationMessage isShow={errors.rePassword} message={errors?.rePassword?.message}></ValidationMessage>

      {/* TODO: SubmitButton pending 편하게 처리할 수 있도록 수정 */}
      {$auth.signUp.match({
        pending: () => <Spinner></Spinner>,
        resolved: () => <SubmitButton disabled={!formState.isValid} text='가입하기'></SubmitButton>,
      })}
    </form>
  ))
}