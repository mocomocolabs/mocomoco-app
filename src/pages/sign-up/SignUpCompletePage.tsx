import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { TextBase } from '../../components/atoms/TextBaseComponent'
import { TextXxxl } from '../../components/atoms/TextXxxlComponent'
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
        <div className='px-6 text-center'>
          <TextXxxl className='text-bold textprimary'>하마가 당신을 기다리고 있어요!</TextXxxl>
          <TextBase className='gray text-left mt-6'>
            맞이할 준비를 마치면
            <br />
            하마지기가 안내해 드릴 거에요.
            <br />
            잠시 후에 만나요 :)
          </TextBase>
        </div>
      </IonContent>
      {/* <Footer>
          <SubmitButton text='시작하기' color='secondary' onClick={() => route.signUp()}></SubmitButton>
      </Footer> */}
    </IonPage>
  )
}
