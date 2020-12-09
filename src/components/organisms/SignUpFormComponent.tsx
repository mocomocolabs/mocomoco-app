import { useObserver } from 'mobx-react-lite'
import React, { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ISignUpForm } from '../../models/sign-up'
import { InputNormal } from '../atoms/InputNormalComponent copy'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'

export const SignUpForm: FC = () => {
  const { register, handleSubmit, errors, watch } = useForm<ISignUpForm>({
    mode: 'onChange',
  })
  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = handleSubmit((form) => {
    console.log(form)
  })

  return useObserver(() => (
    <form id='sign-up-form' onSubmit={onSubmit}>
      <InputNormal name='name' placeholder='이름' register={register({ required: true })}></InputNormal>
      {errors.name && <ValidationMessage message='이름은 필수값입니다'></ValidationMessage>}
      <InputNormal name='nickname' placeholder='별명(선택)' register={register}></InputNormal>
      <InputPassword
        name='password'
        placeholder='비밀번호'
        register={register({
          required: '패스워드를 입력해주세요',
          minLength: { value: 6, message: '6자 이상 입력해주세요' },
        })}
      ></InputPassword>
      {errors.password && <ValidationMessage message={errors.password.message}></ValidationMessage>}
      <InputPassword
        name='rePassword'
        placeholder='비밀번호 확인'
        register={register({
          validate: (value) => value === password.current || '패스워드가 일치하지 않습니다',
        })}
      ></InputPassword>
      {errors.rePassword && <ValidationMessage message={errors.rePassword.message}></ValidationMessage>}
      <SubmitButton text='가입하기'></SubmitButton>
    </form>
  ))
}
