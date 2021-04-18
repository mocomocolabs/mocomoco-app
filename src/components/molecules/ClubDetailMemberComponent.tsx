import { FC } from 'react'
import { IClubMember } from '../../models/club.d'
import { ICommunity } from '../../models/community'
import { Icon } from '../atoms/IconComponent'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'

export interface IClubDetailMember {
  members: IClubMember[]
  community: ICommunity
}

export const ClubDetailMember: FC<IClubDetailMember> = ({ members, community }) => {
  return (
    <div className='flex-col px-container'>
      <div className='flex mb-2'>
        <TextBase className='text-bold'>참여 멤버</TextBase>
        <TextBase className='ml-1'>30명</TextBase>
      </div>
      {members.map((v) => (
        <div key={v.id} className='flex-between-center'>
          <div className='flex items-center'>
            <Profile url={v.profileUrl} className='mr-2 w-10 h-10'></Profile>
            <div className='flex-col'>
              <div className='flex items-center'>
                {v.isAdmin && <Icon name='star-solid' className='icon-yellow mr-1'></Icon>}
                <TextBase>{v.nickname}</TextBase>
              </div>
              <TextSm className='gray'>{community.name}</TextSm>
            </div>
          </div>
          {v.isAdmin && <Icon name='chat'></Icon>}
        </div>
      ))}
    </div>
  )
}
