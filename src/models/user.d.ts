import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
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
  status: SIGN_UP_STATUS
  description: string
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
