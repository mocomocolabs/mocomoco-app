import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { TextSm } from '../../components/atoms/TextSmComponent'
import { TextXxl } from '../../components/atoms/TextXxlComponent'
import { ImageSlider } from '../../components/molecules/ImageSliderComponent'
import { useStore } from '../../hooks/use-store'
import { SIGN_UP_STATUS } from '../../models/sign-up.d'
import { route } from '../../services/route-service'

export const SignUpCompletePage: React.FC = () => {
  const { $ui, $auth } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  useEffect(() => {
    $auth.user.status === SIGN_UP_STATUS.승인 && route.home()
  }, [])

  return (
    <IonPage>
      <IonContent>
        <ImageSlider urls={['/assets/img/hama-signup.png']} height={452}></ImageSlider>
        <div className='px-8'>
          <TextXxl className='text-bold textprimary text-center'>회원가입을 감사드립니다!</TextXxl>
          <TextSm className='textprimary mt-8'>관리자 승인 후 연락드릴게요 :)</TextSm>
        </div>
      </IonContent>
      {/* <IonFooter>
        <div className='mb-7 mx-5'>
          <SubmitButton text='시작하기' color='secondary' onClick={() => route.signUp()}></SubmitButton>
        </div>
      </IonFooter> */}
    </IonPage>
  )
}
