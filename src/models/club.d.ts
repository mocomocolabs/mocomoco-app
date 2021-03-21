import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { ICommunity } from './community.d'
import { IUser } from './user.d'

export interface IClub {
  id: number
  name: string
  description: string
  meetingTime: string
  meetingPlace: string
  community: ICommunity
  imageUrls: string[]
  isMember: boolean
  members: IClubMember[]
  createdAt: string
  isPublic: boolean
}

interface IClubMember extends IUser {
  isAdmin: boolean // TODO: 서버와 협의 필요
}

export interface IClubForm {
  id?: number
  name: string
  meetingTime: string
  meetingPlace: string
  description: string
  images: ImageUploadItem[]
  isPublic: boolean
  hashtags: string[]
}
