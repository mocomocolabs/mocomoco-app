import React, { FC } from 'react'
import { IComment } from '../../models/comment'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'

export interface ICommentItem {
  comment: IComment
}

export const CommentItem: FC<ICommentItem> = ({ comment }) => {
  return (
    <div className='flex'>
      <Profile key={comment.id} url={comment.user.profileUrl}></Profile>
      <div className='flex-col flex-1'>
        <div className='flex-between-center'>
          <TextBase>{comment.user.nickname}</TextBase>
          <TextSm className='gray'>{comment.createdAt}</TextSm>
        </div>
        <TextBase>{comment.content}</TextBase>
      </div>
    </div>
  )
}
