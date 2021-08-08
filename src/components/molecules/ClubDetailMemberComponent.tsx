import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { IClubMember } from '../../models/club.d'
import { ICommunity } from '../../models/community'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'

export interface IClubDetailMember {
  members: IClubMember[]
  community: ICommunity
  createChat: (userId: number) => Promise<number>
}

export const ClubDetailMember: FC<IClubDetailMember> = ({ members, community, createChat }) => {
  const { $auth } = useStore()

  return members?.length ? (
    <div className='flex-col px-container'>
      <div className='flex mb-2'>
        <TextLg className='text-bold'>참여 멤버</TextLg>
        <TextLg className='ml-1'>{members.length}명</TextLg>
      </div>
      {members.map((v) => (
        <div key={v.id} className='flex-between-center mb-4'>
          <div className='flex items-center' onClick={() => route.profileDetail(v.id)}>
            <ProfileImage url={v.profileUrl} className='mr-2 w-10 h-10'></ProfileImage>
            <div className='flex-col'>
              <div className='flex items-center'>
                {v.isAdmin && <Icon name='star-solid' className='icon-primary mr-1' size={20}></Icon>}
                <TextBase className='mt-1'>{v.nickname}</TextBase>
              </div>
              <TextBase className='gray'>{community.name}</TextBase>
            </div>
          </div>
          {v.isAdmin && v.id !== $auth.user.id && (
            <Icon
              name='chat'
              className='icon-secondary'
              onClick={async () => {
                executeWithError(async () => {
                  const roomId = await createChat(v.id)
                  route.chatRoom(roomId)
                })
              }}
            ></Icon>
          )}
        </div>
      ))}
    </div>
  ) : (
    <></>
  )
}
