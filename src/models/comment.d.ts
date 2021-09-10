import { ICommentDto } from '../stores/comment-store.d'
import { IUser } from './user.d'

export interface IComment extends Pick<ICommentDto, 'id' | 'content' | 'createdAt'> {
  user: IUser
}
