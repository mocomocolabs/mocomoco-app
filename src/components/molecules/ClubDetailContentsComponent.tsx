import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { Club } from '../../models/club'
import { route } from '../../services/route-service'
import { Description } from '../atoms/DescriptionComponent'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { ImageSlider } from './ImageSliderComponent'
import { MorePopoverButton } from './MorePopoverButtonComponent'

export interface IClubDetailContents {
  club: Club
}

export const ClubDetailContents: FC<IClubDetailContents> = ({ club }) => {
  const { $club } = useStore()

  return (
    <div>
      <ImageSlider urls={club.imageUrls}></ImageSlider>
      <div className='px-container pt-2'>
        <div className='flex-between-center'>
          <TextLg className='text-bold'>{club.name}</TextLg>
          {$club.club.isAdmin && (
            <MorePopoverButton
              items={[
                {
                  label: '수정',
                  onClick: async () => {
                    await $club.getUpdateForm(club.id)
                    route.clubForm(false)
                  },
                },
              ]}
            ></MorePopoverButton>
          )}
        </div>
        <TextBase className='mt-1 gray'>{club.community?.name}</TextBase>
        <div className='flex items-center mt-4'>
          <Icon name='time' className='mr-1' color='secondary'></Icon>
          <TextBase>{club.meetingTime}</TextBase>
        </div>
        <div className='flex items-center mt-1'>
          <Icon name='location' className='mr-1' color='secondary'></Icon>
          <TextBase>{club.meetingPlace}</TextBase>
        </div>
        <XDivider className='mt-4 mb-6'></XDivider>
        <Description>{club.description}</Description>

        {club.hashtagNames.length ? (
          <TextSm className='mt-5 texthashtag ellipsis'>#{club.hashtagNames.join(' #')}</TextSm>
        ) : (
          ''
        )}
        <XDivider className='mt-5 mb-6'></XDivider>
      </div>
    </div>
  )
}
