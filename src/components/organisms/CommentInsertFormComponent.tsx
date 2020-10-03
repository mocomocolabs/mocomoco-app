import { IonIcon, IonTextarea } from '@ionic/react'
import { paperPlane } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { Profile } from '../atoms/ProfileComponent'
import { Spinner } from '../atoms/SpinnerComponent'

export interface ICommentInsertForm {
  feedId: number
  autoFocus?: boolean
}

export const CommentInsertForm: React.FC<ICommentInsertForm> = ({ feedId, autoFocus = false }) => {
  const { $comment, $feed } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center bg-white'>
      <Profile url='assets/mock/profile1.jpeg'></Profile>

      <IonTextarea
        className='ml-2 bg-m-gray br-lg px-3 black leading-8'
        autoGrow={true}
        rows={1}
        value={$comment.insertForm[feedId]?.content}
        autofocus={autoFocus}
        onIonChange={(e) => {
          $comment.setInsertFormBy(feedId, e.detail.value!)
        }}
      ></IonTextarea>

      <div className='ml-2'>
        {$comment.insertComment.match({
          pending: () => <Spinner></Spinner>,
          resolved: () => (
            <IonIcon
              icon={paperPlane}
              className='black'
              onClick={async () => {
                if ($comment.insertForm[feedId]?.content) {
                  await $comment.insertComment({ feedId, content: $comment.insertForm[feedId]?.content })
                  await $feed.getFeed(feedId)
                  $comment.resetInsertFormBy(feedId)
                }
              }}
            ></IonIcon>
          ),
        })}
      </div>
    </div>
  ))
}
