import { IonButton, IonIcon, IonTextarea } from '@ionic/react'
import { close } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'

export interface ICommentUpdateForm {
  commentId: number
  feedId: number
}

export const CommentUpdateForm: React.FC<ICommentUpdateForm> = ({ commentId, feedId }) => {
  const { $comment, $feed } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex-col bg-white'>
      <div className='flex'>
        <ProfileImage url='assets/mock/profile1.jpeg'></ProfileImage>

        <IonTextarea
          className='ml-2 bg-m-gray br-lg px-3 black leading-8'
          autoGrow={true}
          rows={4}
          value={$comment.updateForm[commentId]?.content}
          autofocus={true}
          onIonChange={(e) => {
            $comment.setUpdateFormBy(commentId, e.detail.value!)
          }}
        ></IonTextarea>
      </div>
      <div className='flex-between-center'>
        <IonIcon icon={close} className='black' onClick={() => $comment.setUpdateCommentId(null)}></IonIcon>

        <SpinnerWrapper
          task={$comment.updateComment}
          Submit={() => (
            <IonButton
              disabled={!$comment.updateForm[commentId]?.content}
              size='small'
              onClick={async () => {
                await $comment.updateComment({
                  id: commentId,
                  feedId,
                  content: $comment.updateForm[commentId]?.content,
                })
                $comment.setUpdateCommentId(null)
                $comment.resetUpdateFormBy(commentId)
                $feed.getFeed(feedId)
              }}
            >
              업데이트
            </IonButton>
          )}
        ></SpinnerWrapper>
      </div>
    </div>
  ))
}
