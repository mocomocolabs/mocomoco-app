import _ from 'lodash'
import { ICommentDto } from '../stores/comment-store.d'
import { IComment } from './comment.d'
import { User } from './user'

export class Comment {
  static of(dto: ICommentDto): IComment {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          user: User.of(dto.user),
        }
      : ({} as IComment)
  }
}
