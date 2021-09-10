import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IClubDto } from '../stores/club-store.d'
import { ICommunity } from './community.d'
import { IUser } from './user.d'

export interface IClub
  extends Pick<
    IClubDto,
    'id' | 'name' | 'description' | 'meetingTime' | 'meetingPlace' | 'isPublic' | 'isLike'
  > {
  community: ICommunity
  members: IClubMember[]
  hashtagNames: string[]
  imageUrls: string[]
  isMember: boolean
  isAdmin: boolean
  likeCount: number
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
