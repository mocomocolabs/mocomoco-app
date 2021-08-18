import { ICommunity } from '../models/community.d'
import { SIGN_UP_STATUS } from '../models/sign-up.d'
import { IFileDto } from './common/file'

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
  roles: USER_ROLE
  isUse: boolean
  status: SIGN_UP_STATUS
  communities: ICommunity[]
  createdAt: string
  description: string
  atchFiles: IFileDto[]
}
