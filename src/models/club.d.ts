import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IUser } from './user.d'

interface IClubMember extends IUser {
  isAdmin: boolean
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
