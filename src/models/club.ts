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
  isMember: boolean
  members: IClubMember[]
  hashtagNames: string[]
  imageUrls: string[]
  isPublic: boolean
  createdAt: string

  static of(payload: IClubDto, userId: number) {
    return Object.assign(new Club(), {
      ...payload,
      community: {
        ...payload.community,
        bannerUrl: payload.community.atchFiles[0]?.url,
      },
      // TODO: IUser 확정시 any제거
      members: payload.clubUsers.map((v) => v.user as any),
      isMember: !!payload.clubUsers.findIndex((v) => v.user.id === userId),
      imageUrls: payload.atchFiles.map((v) => v.url),
      hashtagNames: payload.clubHashtags.map((v) => v.hashtag.name),
    })
  }
}
