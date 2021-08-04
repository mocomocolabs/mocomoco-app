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
          minLength: { value: 2, message: '2자 이상 입력해주세요' },
        })}
      ></InputNormal>
      <div className='height-20 pt-1 px-3'>
        <ValidationMessage isShow={errors.name} message={errors?.name?.message}></ValidationMessage>
      </div>
      {/* <InputNormal placeholder='별명을 입력해주세요(선택)' register={register('nickname')}></InputNormal>
      <Pad className='height-20'></Pad> */}
      <InputPassword
        placeholder='비밀번호를 입력해주세요'
        register={register('password', {
          required: '패스워드를 입력해주세요',
          minLength: { value: 6, message: '6자 이상 입력해주세요' },
        })}
      ></InputPassword>
      <div className='height-20 pt-1 px-3'>
        <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>
      </div>
      <InputPassword
        placeholder='비밀번호를 확인해주세요'
        register={register('rePassword', {
          required: '패스워드를 입력해주세요',
          validate: (value) => value === password.current || '패스워드가 일치하지 않습니다',
        })}
      ></InputPassword>
      <div className='height-20 pt-1 px-3'>
        <ValidationMessage
          isShow={errors.rePassword}
          message={errors?.rePassword?.message}
        ></ValidationMessage>
      </div>
      <Pad className='height-20'></Pad>
      <SubmitButton
        color='secondary'
        size='large'
        disabled={!formState.isValid}
        text='계속하기'
      ></SubmitButton>
    </form>
  ))
}
