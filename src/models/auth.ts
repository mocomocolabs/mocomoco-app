import { IAuthUserDto } from '../stores/auth-store.d'
import { IAuthUser } from './auth.d'

export interface AuthUser extends IAuthUser {}

export class AuthUser {
  static of(dto: IAuthUserDto) {
    return Object.assign(new AuthUser(), {
      ...dto,
      communityId: dto.communities?.[0]?.id,
    })
  }
}
