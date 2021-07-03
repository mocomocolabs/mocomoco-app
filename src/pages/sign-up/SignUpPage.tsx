import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { InputNormal } from '../../components/atoms/InputNormalComponent'
import { Pad } from '../../components/atoms/PadComponent'
import { SubmitButton } from '../../components/atoms/SubmitButtonComponent'
import { TextXs } from '../../components/atoms/TextXsComponent'
import { TextXxl } from '../../components/atoms/TextXxlComponent'
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
        <div className='px-container'>
          <TextXxl className='text-bold d-gray mt-8'>
            하나의 마을
            <br />
            하마에 어서오세요!
          </TextXxl>
          <Pad className='height-50'></Pad>
          <InputNormal
            type='email'
            placeholder='이메일을 입력해주세요'
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
            color='secondary'
            text='이메일로 시작하기'
            onClick={async () => {
              $auth.setSignUpForm({ email: getValues().email })

              $auth
                .checkEmail(getValues().email)
                .then(() => {
                  route.signUpForm()
                })
                .catch((err) => {
                  if (err.status === 409) {
                    route.signIn()
                  }
                })
            }}
          ></SubmitButton>
          <TextXs className='gray mt-4 text-center'>
            회원가입시 개인정보 처리방침을 읽었으며,
            <br />
            이용약관에 동의하신 것으로 간주합니다.
          </TextXs>
        </div>
      </IonContent>
    </IonPage>
  ))
}
