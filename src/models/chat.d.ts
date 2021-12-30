import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { IChatDto, IChatRoomDto } from '../stores/chat-store.d'
import { IClub } from './club.d'
import { IStuffTalent } from './stufftalent.d'
import { IUser } from './user.d'

export interface IChat extends Pick<IChatDto, 'id' | 'type' | 'message' | 'createdAt'> {
  user: IUser
  imageUrls: string[]
}

export interface IChatRoom extends Pick<IChatRoomDto, 'id' | 'type' | 'name' | 'readChatId' | 'createdAt'> {
  users: IUser[]
  chats: IChat[]
  club: IClub
  stuff: IStuffTalent
  talent: IStuffTalent
}

export interface IChatMessageForm {
  message: string
}

export interface IChatImagesForm {
  id: number
  images: ImageUploadItem[]
}

export interface IStoreChatRoom {
  id: number
  readChatId: number
  // TODO: unreadCount인 것이 더 직관적인 이름일듯
  readCount: number
}

export enum ChatRoomType {
  ALL = '',
  NORMAL = 'NORMAL',
  CLUB = 'CLUB',
  STUFF = 'STUFF',
  TALENT = 'TALENT',
}

export enum ChatType {
  TALK = 'TALK',
  ENTER = 'ENTER',
  LEAVE = 'LEAVE',
  UPLOADING = 'UPLOADING',
}
