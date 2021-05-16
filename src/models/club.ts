import { IClubDto } from '../stores/club-store.d'
import { IClub } from './club.d'

export interface Club extends IClub {}

export class Club {
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
      isMember: payload.clubUsers.some((v) => v.user.id === userId),
      isAdmin: payload.adminUsers.some((v) => v.id === userId),
      chatroomId: payload.chatroom.id,
    })
  }
}
