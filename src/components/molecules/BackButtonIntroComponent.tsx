import { FC } from 'react'
import { route } from '../../services/route-service'
import { Pad } from '../atoms/PadComponent'
import { TextXxl } from '../atoms/TextXxlComponent'
import { BackButton } from './BackButtonComponent'

export interface IBackButtonIntro {
  children?: React.ReactNode
}

export const BackButtonIntro: FC<IBackButtonIntro> = ({ children }) => {
  return (
    <>
      <div className='flex mt-5'>
        <div className='mt-1 absolute'>
          <BackButton type='arrow' action={() => route.signUp()}></BackButton>
        </div>
        <TextXxl className='textprimary flex-1 text-bold text-center'>{children}</TextXxl>
      </div>
      <Pad className='height-30'></Pad>
    </>
  )
}
