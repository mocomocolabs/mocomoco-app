import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import type { IUserDto } from '../stores/user-store.d'
import type { ICommunity } from './community.d'

export interface IUser extends Pick<IUserDto, 'id' | 'name' | 'nickname' | 'description' | 'status'> {
  communities: ICommunity[]
  profileUrl: string
}

export interface IUserForm {
  id: number
  name: string
  nickname: string
  communities: Pick<ICommunity, 'name'>[]
  description: string
  profileUrl: string
  image: ImageUploadItem
}
