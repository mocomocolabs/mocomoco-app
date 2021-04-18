import { IFileDto } from './common/file'

export interface ICommunityDto {
  id: number
  isUse: boolean
  name: string
  userCount: number
  // users: []
  atchFiles: IFileDto[]
}
