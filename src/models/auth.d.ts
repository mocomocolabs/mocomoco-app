import { IUser } from './user.d'

export interface IAuthUser extends IUser {
  communityId: number
  chatroomIds: []
}
