import type { IFileDto } from './common/file'
import type { IUserDto } from './user-store.d'

export interface ICommunityDto {
  id: number
  isUse: boolean
  name: string
  userCount: number
  users?: IUserDto[]
  atchFiles: IFileDto[]
}
