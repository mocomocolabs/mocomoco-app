import { IAuthUserDto } from '../stores/auth-store.d'

export interface IAuthUser extends IAuthUserDto {
  profileUrl: string
  communityId: number
}
