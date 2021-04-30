import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { InputNormal } from '../../components/atoms/InputNormalComponent'
import { SubmitButton } from '../../components/atoms/SubmitButtonComponent'
import { ValidationMessage } from '../../components/atoms/ValidationMessageComponent'
import { useStore } from '../../hooks/use-store'
import { ISignUpForm } from '../../models/sign-up'
import { route } from '../../services/route-service'

export const SignUpPage: React.FC = () => {
  const { $ui, $auth } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm<ISignUpForm>({
    mode: 'onChange',
  })

  return useObserver(() => (
    <IonPage>
      <IonContent>
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
        <SubmitButton
          disabled={!isValid}
          text='이메일로 시작하기'
          onClick={async () => {
            $auth
              .checkEmail(getValues().email)
              .then(() => {
                $auth.setSignUpForm({ email: getValues().email })
                route.signUpCommunity()
              })
              .catch((err) => {
                if (err.status === 409) {
                  $ui.showToastError({ message: '중복된 이메일입니다.' })
                }
              })
          }}
        ></SubmitButton>
        <button onClick={() => route.signIn()}>로그인</button>
      </IonContent>
    </IonPage>
  ))
}
