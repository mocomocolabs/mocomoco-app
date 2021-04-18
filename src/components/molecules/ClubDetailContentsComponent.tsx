import { FC } from 'react'
import { Club } from '../../models/club'
import { Description } from '../atoms/DescriptionComponent'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { ImageWithCorner } from './ImageWithCorner'

export interface IClubDetailContents {
  club: Club
}

export const ClubDetailContents: FC<IClubDetailContents> = ({ club }) => {
  return (
    <div>
      <ImageWithCorner height={337} url={club.imageUrls[0]}></ImageWithCorner>
      <div className='px-container pt-2'>
        <TextLg className='text-bold'>{club.name}</TextLg>
        <TextSm className='mt-1 gray'>{club.community.name}</TextSm>
        <div className='flex items-center mt-4'>
          <Icon name='time' className='mr-1'></Icon>
          <TextBase>{club.meetingPlace}</TextBase>
        </div>
        <div className='flex items-center mt-1'>
          <Icon name='location' className='mr-1'></Icon>
          <TextBase>{club.meetingTime}</TextBase>
        </div>
        <XDivider className='mt-4 mb-6'></XDivider>
        <Description>{club.description}</Description>
        <XDivider className='mt-5 mb-6'></XDivider>
      </div>
    </div>
  )
}
