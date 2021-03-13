import { FC } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import './ClubSmallCardComponent.scss'

export interface IClubSmallCard {}

export const ClubSmallCard: FC<IClubSmallCard> = () => {
  return (
    <div className='flex-col width-160 height-224 br-xxlg shadow pb-2'>
      <div
        className='height-130 bg-image br-t-xxlg'
        style={{
          backgroundImage: `url('/assets/img/club/club01.jpg')`,
          backgroundSize: 'cover',
        }}
      ></div>
      <div className='flex-col w-full bg-white -m-3 z-10 px-3 ml-0 br-tl-xxlg br-b-xxlg relative text-left'>
        <img src='/assets/img/corner.svg' className='corner' alt='' />
        <TextBase className='text-bold mt-2'>뜨개질 모임</TextBase>
        <div className='flex items-center'>
          <Icon name='time' className=''></Icon>
          <TextXs className='ml-1'>매주 수요일 저녁 8:30</TextXs>
        </div>
        <div className='flex items-center mb-2'>
          <Icon name='time' className=''></Icon>
          <TextXs className='ml-1'>온라인</TextXs>
        </div>
        <TextXs className='green'>#뜨개질 #취미</TextXs>
      </div>
    </div>
  )
}
