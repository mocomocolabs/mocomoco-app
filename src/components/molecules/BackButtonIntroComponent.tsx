import { FC } from 'react'
import { Pad } from '../atoms/PadComponent'
import { TextXxl } from '../atoms/TextXxlComponent'
import { BackButton } from './BackButtonComponent'

export interface IBackButtonIntro {
  children?: React.ReactNode
}

export const BackButtonIntro: FC<IBackButtonIntro> = ({ children }) => {
  return (
    <>
      <div className='flex mt-5 keep-word'>
        <div className='mt-1 absolute'>
          <BackButton type='arrow' />
        </div>
        <TextXxl className='textprimary flex-1 text-bold text-center leading-12 mx-7'>{children}</TextXxl>
      </div>
      <Pad className='height-30'></Pad>
    </>
  )
}
