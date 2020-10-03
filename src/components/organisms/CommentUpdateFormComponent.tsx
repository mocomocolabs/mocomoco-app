import { IonButton, IonIcon, IonTextarea } from '@ionic/react'
import { close } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { Profile } from '../atoms/ProfileComponent'
import { Spinner } from '../atoms/SpinnerComponent'

export interface ICommentUpdateForm {
  commentId: number
}

export const CommentUpdateForm: React.FC<ICommentUpdateForm> = ({ commentId }) => {
  const { $comment } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex-col bg-white'>
      <div className='flex'>
        <Profile url='assets/mock/profile1.jpeg'></Profile>

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

        {$comment.updateComment.match({
          pending: () => <Spinner></Spinner>,
          resolved: () => (
            <IonButton
              disabled={!$comment.updateForm[commentId]?.content}
              size='small'
              onClick={async () => {
                await $comment.updateComment({
                  id: commentId,
                  content: $comment.updateForm[commentId]?.content,
                })
                $comment.setUpdateCommentId(null)
                $comment.resetUpdateFormBy(commentId)
              }}
            >
              업데이트
            </IonButton>
          ),
        })}
      </div>
    </div>
  ))
}
