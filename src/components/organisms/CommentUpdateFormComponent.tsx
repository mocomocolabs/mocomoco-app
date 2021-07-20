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
    <>
      <Icon
        name='close'
        onClick={() => {
          $comment.setUpdateCommentId(null)
        }}
      ></Icon>

      <div className='flex-between-center w-full ml-3 px-3 br-20 border-primary'>
        <IonTextarea
          autoGrow={true}
          rows={1}
          value={$comment.updateForm[commentId]?.content}
          autofocus={true}
          onIonChange={(e) => {
            $comment.setUpdateFormBy(commentId, e.detail.value!)
          }}
        />

        <SpinnerWrapper
          task={$comment.updateComment}
          Submit={
            <Icon
              name={`${$comment.updateForm[commentId]?.content ? 'send-solid' : 'send'}`}
              className='icon-secondary'
              onClick={() => {
                if ($comment.updateForm[commentId]?.content) {
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
          }
        />
      </div>
    </>
  ))
}
