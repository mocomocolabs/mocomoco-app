import { useObserver } from 'mobx-react-lite'
import React, { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { InputNormal } from '../atoms/InputNormalComponent'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'
import { webSocket } from '../../services/WebSocketService'
import { IChat, ISubChat } from '../../models/chat'

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

  const { $auth, $chat } = useStore()

  const onSubmit = handleSubmit((form) => {
    executeWithError(() =>
      $auth
        .signIn(form.email, form.password)
        .then(async () => {
          // 챗방 리스트 조회
          await $chat.getRooms({ roomIds: $auth.user.chatroomIds })
          // websocket 연결
          webSocket.init()
          webSocket.connectRooms(
            $chat.rooms.map((v) => v.id),
            (data) => {
              const subChat = JSON.parse(data.body) as ISubChat
              console.log(subChat)
              $chat.setChat(subChat)
            }
          )
        })
        .then(() => {
          route.home()
        })
    )
  })

  return useObserver(() => (
    <form onSubmit={onSubmit}>
      <InputNormal
        type='email'
        placeholder='이메일'
        register={register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: /\S+@\S+[.]\S+$/,
            message: '이메일 형식이 올바르지 않습니다.',
          },
        })}
      ></InputNormal>
      <ValidationMessage isShow={errors.email} message={errors.email?.message}></ValidationMessage>

      <InputPassword
        placeholder='비밀번호'
        register={register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 6, message: '6자 이상 입력해주세요' },
        })}
      ></InputPassword>
      <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>

      <SpinnerWrapper
        task={$auth.signUp}
        Submit={() => <SubmitButton disabled={!formState.isValid} text='로그인'></SubmitButton>}
      ></SpinnerWrapper>
    </form>
  ))
}
