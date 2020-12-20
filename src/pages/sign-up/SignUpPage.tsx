import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputNormal } from '../../components/atoms/InputNormalComponent copy'
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

  const { register, errors, formState, getValues } = useForm<ISignUpForm>({
    mode: 'onChange',
  })

  return useObserver(() => (
    <IonPage>
      <IonContent>
        <InputNormal
          name='email'
          type='email'
          placeholder='이메일'
          register={register({
            required: '이메일을 입력해주세요',
            pattern: {
              value: /\S+@\S+[.]\S+$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
        ></InputNormal>
        <ValidationMessage isShow={errors.email} message={errors.email?.message}></ValidationMessage>
        <SubmitButton
          disabled={!formState.isValid}
          text='이메일로 시작하기'
          onClick={async () => {
            // TODO: 이메일 중복 검사 필요
            // const exists = await $auth.checkEmail(getValues().email)
            $auth.setSignUpForm({ email: getValues().email })
            route.signUpCommunity()
          }}
        ></SubmitButton>
      </IonContent>
    </IonPage>
  ))
}
