import { IClubDto } from '../stores/club-store.d'
import { IClubMember } from './club.d'
import { ICommunity } from './community'

export class Club {
  id: number
  name: string
  description: string
  meetingTime: string
  meetingPlace: string
  community: ICommunity
  members: IClubMember[]
  hashtagNames: string[]
  imageUrls: string[]
  isMember: boolean
  isAdmin: boolean
  isPublic: boolean
  createdAt: string

  static of(payload: IClubDto, userId: number) {
    return Object.assign(new Club(), {
      ...payload,
      community: {
        ...payload.community,
        bannerUrl: payload.community.atchFiles[0]?.url,
      },
      members: payload.clubUsers.map((v) => ({
        ...v.user,
        // TODO: api업데이트 후 체크 필요
        isAdmin: v.user.role === 'ROLE_ADMIN',
      })),
      imageUrls: payload.atchFiles.map((v) => v.url),
      hashtagNames: payload.clubHashtags.map((v) => v.hashtag.name),
      isMember: !!payload.clubUsers.findIndex((v) => v.user.id === userId),
      isAdmin: !!payload.adminUsers.findIndex((v) => v.id === userId),
    })
  }
}
