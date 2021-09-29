import _ from 'lodash'
import { CLUB_ROLE, IClubDto, IClubMemberDto } from '../stores/club-store.d'
import { IUserDto } from '../stores/user-store.d'
import { IClub, IClubMember } from './club.d'
import { Community } from './community'
import { User } from './user'

export interface Club extends IClub {}

export class Club {
  static of(dto: IClubDto, userId: number): IClub {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          community: Community.of(dto.community),
          members: dto.clubUsers
            .filter((cu) => [CLUB_ROLE.ADMIN, CLUB_ROLE.USER].includes(cu.role) && cu.isUse && cu.user.isUse)
            .map((v) => Club.membersOf(v, dto.adminUsers)),
          hashtagNames: dto.clubHashtags.map((v) => v.hashtag.name),
          imageUrls: dto.atchFiles.map((v) => v.url),
          isMember: dto.clubUsers.some((v) => v.user.id === userId),
          isAdmin: dto.adminUsers.some((v) => v.id === userId),
          likeCount: dto.clubUsers.filter((clubUser) => clubUser.isLike).length,
          chatroomId: dto.chatroom.id,
        }
      : ({} as IClub)
  }

  static membersOf(dto: IClubMemberDto, adminUsers: IUserDto[]): IClubMember {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...User.of(dto.user),
          isAdmin: adminUsers.some((au) => au.id === dto.user.id),
        }
      : ({} as IClubMember)
  }
}
