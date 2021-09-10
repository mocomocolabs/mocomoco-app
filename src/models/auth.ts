import _ from 'lodash'
import { IAuthUserDto } from '../stores/auth-store.d'
import { IAuthUser } from './auth.d'
import { User } from './user'

export interface AuthUser extends IAuthUser {}

export class AuthUser {
  static of(dto: IAuthUserDto): IAuthUser {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          ...User.of(dto),
          communityId: dto.communities?.[0]?.id,
        }
      : ({} as IAuthUser)
  }
}
