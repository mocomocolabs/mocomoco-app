import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IUserDto } from '../stores/user-store.d'
import { ICommunity } from './community.d'

export interface IUser extends Pick<IUserDto, 'id' | 'name' | 'nickname' | 'description' | 'status'> {
  communities: ICommunity[]
  profileUrl: string
}

export interface IUserForm {
  id: number
  name: string
  nickname: string
  communities: ICommunity[]
  description: string
  profileUrl: string
  image: ImageUploadItem
}
