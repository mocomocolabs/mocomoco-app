import { IonContent, IonFooter, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { SubmitButton } from '../components/atoms/SubmitButtonComponent'
import { TextSm } from '../components/atoms/TextSmComponent'
import { TextXxl } from '../components/atoms/TextXxlComponent'
import { ImageSlider } from '../components/molecules/ImageSliderComponent'
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
        <ImageSlider urls={['/assets/img/hama.png']}></ImageSlider>
        <div className='px-8'>
          <TextXxl className='text-bold textprimary'>
            하나의 마을
            <br />
            하마에 어서오세요!
          </TextXxl>
          <TextSm className='gray mt-8'>
            개인이 모여 하나의 공동체를 이루고
            <br />
            확장되고 연결되어 하나의 마을을 이루고
            <br />
            마을과 마을이 연결되어 하나의 지구를 이룹니다.
            <br />
          </TextSm>
        </div>
      </IonContent>
      <IonFooter>
        <div className='mb-7 mx-5'>
          <SubmitButton text='시작하기' color='secondary' onClick={() => route.signUp()}></SubmitButton>
        </div>
      </IonFooter>
    </IonPage>
  )
}
