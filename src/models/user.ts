import _ from 'lodash'
import { IUserDto } from '../stores/user-store.d'
import { Community } from './community'
import { IUser } from './user.d'

export interface User extends IUser {}

export class User {
  static of(dto: IUserDto): IUser {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          communities: dto.communities.map(Community.of),
          profileUrl: dto.atchFiles?.[0]?.url,
        }
      : ({} as IUser)
  }
}
