import { SIGN_UP_STATUS } from '../models/sign-up.d'
import { IFileDto } from './common/file'
import { ICommunityDto } from './community-store.d'

export enum USER_ROLE {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  SYS = 'ROLE_SYS',
}

export type IUserDto = {
  id: number
  name: string
  nickname: string
  description: string
  email: string
  mobile: string
  isPublicEmail: boolean
  isPublicMobile: boolean
  roles: USER_ROLE
  status: SIGN_UP_STATUS
  communities: ICommunityDto[]
  atchFiles: IFileDto[]
  isUse: boolean
}
