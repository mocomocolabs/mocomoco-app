import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { ISignUpForm } from '../../models/sign-up'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { InputNormal } from '../atoms/InputNormalComponent'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'

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
  const observableTaskGroup = TaskGroup<any[], void | boolean>([$auth.signUp, $auth.signIn])

  const onSubmit = handleSubmit(async (form) => {
    $auth.setSignUpForm(form)

    executeWithError(async () => {
      await $auth.signUp($auth.signUpForm)
      await $auth.signIn($auth.signUpForm.email!, form.password)
      route.feed()
    })
  })

  return useObserver(() => (
    <form onSubmit={onSubmit}>
      <InputNormal placeholder='이름' register={register('name', { required: true })}></InputNormal>
      <ValidationMessage isShow={errors.name} message='이름은 필수값입니다'></ValidationMessage>
      <InputNormal placeholder='별명(선택)' register={register('nickname')}></InputNormal>
      <InputPassword
        placeholder='비밀번호'
        register={register('password', {
          required: '패스워드를 입력해주세요',
          minLength: { value: 6, message: '6자 이상 입력해주세요' },
        })}
      ></InputPassword>
      <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>
      <InputPassword
        placeholder='비밀번호 확인'
        register={register('rePassword', {
          required: '패스워드를 입력해주세요',
          validate: (value) => value === password.current || '패스워드가 일치하지 않습니다',
        })}
      ></InputPassword>
      <ValidationMessage isShow={errors.rePassword} message={errors?.rePassword?.message}></ValidationMessage>

      {observableTaskGroup.match({
        pending: () => <Spinner></Spinner>,
        resolved: () => <SubmitButton disabled={!formState.isValid} text='가입하기'></SubmitButton>,
        rejected: () => {
          $auth.signUp.reset()
          $auth.signIn.reset()
          return <></>
        },
      })}
    </form>
  ))
}
