import { USER_STATUS } from '../stores/user-store.d'
import { ICommunity } from './community'

export interface IUser {
  id: number
  name: string
  nickname: string
  communities: ICommunity[]
  email: string
  isPublicEmail: boolean
  mobile: string
  isPublicMobile: boolean
  profileUrl: string
  status: USER_STATUS
}
