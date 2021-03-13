import { IonSlide, IonSlides } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { ClubSmallCard } from '../molecules/ClubSmallCardComponent'
import './ClubPopularSlideComponent.scss'

export interface IClubPopularSlide {}

export const ClubPopularSlide: FC<IClubPopularSlide> = () => {
  const slideOpts = {
    initialSlide: 0,
    spaceBetween: 8,
    slidesPerView: 'auto',
    speed: 400,
  }

  return useObserver(() => (
    <IonSlides pager={false} options={slideOpts} className='pb-3'>
      <IonSlide className='w-auto'>
        <ClubSmallCard></ClubSmallCard>
      </IonSlide>
      <IonSlide className='w-auto'>
        <ClubSmallCard></ClubSmallCard>
      </IonSlide>
      <IonSlide className='w-auto'>
        <ClubSmallCard></ClubSmallCard>
      </IonSlide>
      <IonSlide className='w-auto'>
        <ClubSmallCard></ClubSmallCard>
      </IonSlide>
    </IonSlides>
  ))
}
