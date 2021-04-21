import { ICommunity } from '../models/community.d'

export enum USER_STATUS {
  APPROVAL = 'APPROVAL',
  PENDING = 'PENDING',
}

export enum USER_ROLE {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  SYS = 'ROLD_SYS',
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
  status: string
  profileUrl: string
  communities: ICommunity[]
  createdAt: string
}
