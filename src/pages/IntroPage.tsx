import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { SubmitButton } from '../components/atoms/SubmitButtonComponent'
import { TextSm } from '../components/atoms/TextSmComponent'
import { TextXxxl } from '../components/atoms/TextXxxlComponent'
import { ImageSlider } from '../components/molecules/ImageSliderComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'
import { storage } from '../services/storage-service'

export const IntroPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
    storage.setHaveSeenIntro()
  }, [])

  return (
    <IonPage>
      <IonContent>
        <ImageSlider urls={['/assets/img/hama.png']} height={380}></ImageSlider>
        <div className='px-8 -mt-2'>
          <TextXxxl className='text-bold textprimary'>
            하나의 마을
            <br />
            하마에 어서오세요!
          </TextXxxl>
          <TextSm className='gray my-7'>
            개인이 모여 하나의 공동체를 이루고
            <br />
            확장되고 연결되어 하나의 마을을 이루고
            <br />
            마을과 마을이 연결되어 하나의 지구를 이룹니다.
            <br />
          </TextSm>
        </div>
      </IonContent>
      <Footer className='pb-5 px-5' noBorder>
        <SubmitButton
          text='시작하기'
          color='secondary'
          size='large'
          onClick={() => route.signUp()}
        ></SubmitButton>
      </Footer>
    </IonPage>
  )
}
