import React, { FC } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import { ImageWithCorner } from '../molecules/ImageWithCorner'

export interface IClubOurTownList {}

export const ClubOurTownList: FC<IClubOurTownList> = () => {
  return (
    <>
      <div className='flex-col br-xxlg shadow pb-2 relative mb-5'>
        <ImageWithCorner height={160} url='/assets/img/club/club01.jpg'></ImageWithCorner>
        <div className='flex-col px-3 ml-0 br-b-xxlg text-left'>
          <TextBase className='text-bold'>뜨개질 모임</TextBase>
          <div className='flex'>
            <div className='flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>매주 수요일 저녁 8:30</TextXs>
            </div>
            <div className='ml-4 flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>온라인</TextXs>
            </div>
          </div>
          <TextXs className='green mt-2'>#뜨개질 #취미</TextXs>
        </div>
      </div>
      <div className='flex-col br-xxlg shadow pb-2 relative'>
        <ImageWithCorner height={160} url='/assets/img/club/club01.jpg'></ImageWithCorner>
        <div className='flex-col px-3 ml-0 br-b-xxlg text-left'>
          <TextBase className='text-bold'>뜨개질 모임</TextBase>
          <div className='flex'>
            <div className='flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>매주 수요일 저녁 8:30</TextXs>
            </div>
            <div className='ml-4 flex items-center'>
              <Icon name='time' className=''></Icon>
              <TextXs className='ml-1'>온라인</TextXs>
            </div>
          </div>
          <TextXs className='green mt-2'>#뜨개질 #취미</TextXs>
        </div>
      </div>
    </>
  )
}
