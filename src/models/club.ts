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
        isAdmin: payload.adminUsers.some((au) => au.id === v.user.id),
      })),
      imageUrls: payload.atchFiles.map((v) => v.url),
      hashtagNames: payload.clubHashtags.map((v) => v.hashtag.name),
      isMember: payload.clubUsers.some((v) => v.user.id === userId),
      isAdmin: payload.adminUsers.some((v) => v.id === userId),
      likeCount: payload.clubUsers.filter((clubUser) => clubUser.isLike).length,
      chatroomId: payload.chatroom.id,
    })
  }
}
