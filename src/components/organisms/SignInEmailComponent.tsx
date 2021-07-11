import { useObserver } from 'mobx-react-lite'
import { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { ISubChat } from '../../models/chat'
import { route } from '../../services/route-service'
import { webSocket } from '../../services/web-socket-service'
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

  const { $auth, $chat } = useStore()

  useEffect(() => {
    if (!$auth.signUpForm.email) {
      route.signUp()
    }
  }, [])

  const onSubmit = handleSubmit((form) => {
    executeWithError(() =>
      $auth
        .signIn($auth.signUpForm.email!, form.password)
        .then(async () => {
          // TODO: App.tsx의 코드와 중복됌. 하나로 합칠 필요가 있을듯
          // 챗방 리스트 조회
          await $chat.getRooms({ roomIds: $auth.user.chatroomIds })
          // websocket 연결
          webSocket.init()
          webSocket.connectRooms(
            $chat.rooms.map((v) => v.id),
            (data) => {
              const subChat = JSON.parse(data.body) as ISubChat
              $chat.setChat(subChat)
              $chat.setLastChatId({
                roomId: subChat.chatroom.id,
                readChatId: subChat.id,
              })
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
      <InputPassword
        placeholder='비밀번호를 입력해주세요'
        register={register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 6, message: '6자 이상 입력해주세요' },
        })}
      ></InputPassword>
      <div className='h-10 pt-1 px-3'>
        <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>
      </div>
      <SpinnerWrapper
        task={$auth.signUp}
        Submit={<SubmitButton disabled={!formState.isValid} text='로그인'></SubmitButton>}
      ></SpinnerWrapper>
    </form>
  ))
}
