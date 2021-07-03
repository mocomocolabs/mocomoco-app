import { SIGN_UP_STATUS } from './sign-up.d'

export interface IAuthUser {
  id: number
  communityId: number
  chatroomIds: []
  status: SIGN_UP_STATUS
}
