import { FC } from 'react'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'

export interface IProfileCard {
  nickname: string
  profileUrl: string
  communityName: string
  /** 공동체명 우측에 추가 텍스트 추가가능 */
  extraText?: string
  /** 이름 왼쪽에 별표 표시 여부 */
  isStar?: boolean
}

export const ProfileCard: FC<IProfileCard> = ({ profileUrl, nickname, communityName, extraText }) => {
  return (
    <div className='flex'>
      <ProfileImage url={profileUrl}></ProfileImage>
      <div className='flex-col ml-3'>
        <TextBase className=''>{nickname}</TextBase>
        <TextSm className='gray'>
          {communityName}
          {extraText ? ` / ${extraText}` : ''}
        </TextSm>
      </div>
    </div>
  )
}
