import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { IClubMember } from '../../models/club.d'
import { ICommunity } from '../../models/community'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'

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
        <TextBase className='text-bold'>참여 멤버</TextBase>
        <TextBase className='ml-1'>{members.length}명</TextBase>
      </div>
      {members.map((v) => (
        <div key={v.id} className='flex-between-center mb-4'>
          <div className='flex items-center'>
            <ProfileImage url={v.profileUrl} className='mr-2 w-10 h-10'></ProfileImage>
            <div className='flex-col'>
              <div className='flex items-center'>
                {v.isAdmin && <Icon name='star-solid' className='icon-primary mr-1'></Icon>}
                <TextBase className='mt-1'>{v.nickname}</TextBase>
              </div>
              <TextSm className='gray'>{community.name}</TextSm>
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
