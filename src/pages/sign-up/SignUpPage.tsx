import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputNormal } from '../../components/atoms/InputNormalComponent'
import { Pad } from '../../components/atoms/PadComponent'
import { SubmitButton } from '../../components/atoms/SubmitButtonComponent'
import { TextXs } from '../../components/atoms/TextXsComponent'
import { TextXxxl } from '../../components/atoms/TextXxxlComponent'
import { ValidationMessage } from '../../components/atoms/ValidationMessageComponent'
import { useStore } from '../../hooks/use-store'
import { ISignUpForm } from '../../models/sign-up'
import { route } from '../../services/route-service'

export const SignUpPage: React.FC = () => {
  const { $ui, $auth } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm<ISignUpForm>({
    mode: 'onChange',
  })

  return useObserver(() => (
    <IonPage>
      <IonHeader className='ion-no-border'></IonHeader>
      <IonContent>
        <div className='px-container mt-8'>
          <TextXxxl className='text-bold textprimary'>
            하나의 마을
            <br />
            하마에 어서오세요!
          </TextXxxl>

          <Pad className='height-30' />

          <InputNormal
            type='email'
            placeholder='이메일을 입력해주세요'
            register={register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /\S+@\S+[.]\S+$/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
          />
          <ValidationMessage message={errors.email?.message} className='height-40' keepSpace />

          <SubmitButton
            disabled={!isValid}
            color='secondary'
            size='large'
            text='이메일로 시작하기'
            onClick={async () => {
              const email = getValues('email')

              $auth.setSignUpForm({ email })

              const exists = await $auth.checkEmailExists(email)
              exists ? route.signIn() : route.signUpForm()
            }}
          />

          <TextXs className='gray mt-4 text-center'>
            회원가입시{' '}
            <strong className='underline' onClick={() => route.termPrivacy()}>
              개인정보 처리방침
            </strong>
            을 읽었으며,
            <br />
            <strong className='underline' onClick={() => route.termUse()}>
              이용약관
            </strong>
            에 동의하신 것으로 간주합니다.
          </TextXs>
        </div>
      </IonContent>
    </IonPage>
  ))
}
