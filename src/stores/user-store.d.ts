import { ICommunity } from '../models/community.d'
import { SIGN_UP_STATUS } from '../models/sign-up.d'

export enum USER_ROLE {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  SYS = 'ROLE_SYS',
}

export type IUserDto = {
  id: number
  name: string
  nickname: string
  email: string
  mobile: string
  isPublicEmail: boolean
  isPublicMobile: boolean
  role: USER_ROLE
  isUse: boolean
  status: SIGN_UP_STATUS
  profileUrl: string
  communities: ICommunity[]
  createdAt: string
}
