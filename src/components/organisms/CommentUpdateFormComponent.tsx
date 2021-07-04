import { IonTextarea } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { executeWithError } from '../../utils/http-helper-util'
import { Icon } from '../atoms/IconComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'

export interface ICommentUpdateForm {
  commentId: number
  feedId: number
}

export const CommentUpdateForm: React.FC<ICommentUpdateForm> = ({ commentId, feedId }) => {
  const { $comment, $feed } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center'>
      <Icon
        name='close'
        className='icon-20'
        onClick={() => {
          $comment.setUpdateCommentId(null)
        }}
      ></Icon>

      <IonTextarea
        className='ml-2 br-20 pl-4 px-3 black leading-8 border-primary'
        autoGrow={true}
        rows={1}
        value={$comment.updateForm[commentId]?.content}
        autofocus={true}
        onIonChange={(e) => {
          $comment.setUpdateFormBy(commentId, e.detail.value!)
        }}
      ></IonTextarea>

      <div className='ml-2'>
        <SpinnerWrapper
          task={$comment.updateComment}
          Submit={() => (
            <Icon
              name='send-solid'
              className={$comment.updateForm[commentId]?.content ? 'icon-secondary' : 'icon-gray'}
              onClick={() => {
                if ($comment.insertForm[feedId]?.content) {
                  executeWithError(async () => {
                    await $comment.updateComment({
                      id: commentId,
                      feedId,
                      content: $comment.updateForm[commentId]?.content,
                    })
                    $comment.setUpdateCommentId(null)
                    $comment.resetUpdateFormBy(commentId)
                    $feed.getFeed(feedId)
                  })
                }
              }}
            ></Icon>
          )}
        ></SpinnerWrapper>
      </div>
    </div>
  ))
}
