import { ICommunity } from './community'
import { SIGN_UP_STATUS } from './sign-up.d'

export interface IUser {
  id: number
  name: string
  nickname: string
  communities: ICommunity[]
  email: string
  isPublicEmail: boolean
  mobile: string
  isPublicMobile: boolean
  profileUrl: string
  status: SIGN_UP_STATUS
  description: string
}
