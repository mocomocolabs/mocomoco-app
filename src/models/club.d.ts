import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IUser } from './user.d'

interface IClubMember extends IUser {
  isAdmin: boolean // TODO: 서버와 협의 필요
}

export interface IClubForm {
  id?: number
  communityId: number
  name: string
  meetingTime: string
  meetingPlace: string
  description: string
  images: ImageUploadItem[]
  isPublic: boolean
  hashtagNames: string[]
}
