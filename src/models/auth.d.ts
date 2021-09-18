import { IAuthUserDto } from '../stores/auth-store.d'
import { IUser } from './user.d'

export interface IAuthUser extends IUser, Pick<IAuthUserDto, 'chatroomIds'> {
  communityId: number
}
