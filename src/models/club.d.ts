import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { ICommunity } from './community'
import { IUser } from './user.d'

export interface IClub {
  id: number
  name: string
  description: string
  meetingTime: string
  meetingPlace: string
  community: ICommunity
  members: IClubMember[]
  hashtagNames: string[]
  imageUrls: string[]
  isMember: boolean
  isAdmin: boolean
  isPublic: boolean
  createdAt: string
  chatroomId: number
}

export interface IClubMember extends IUser {
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
