import { IonIcon, IonTextarea } from '@ionic/react'
import { paperPlane } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { Profile } from '../atoms/ProfileComponent'
import { Spinner } from '../atoms/SpinnerComponent'

export interface ICommentForm {
  feedId: number
  autoFocus?: boolean
}

export const CommentForm: React.FC<ICommentForm> = ({ feedId, autoFocus = false }) => {
  const [text, setText] = useState<string>()
  const { $comment, $feed } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center bg-white'>
      <Profile url='assets/mock/profile1.jpeg'></Profile>

      <IonTextarea
        className='ml-2 bg-m-gray br-lg px-3 black leading-8'
        autoGrow={true}
        rows={1}
        value={text}
        autofocus={autoFocus}
        onIonChange={(e) => {
          setText(e.detail.value!)
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
                if (text) {
                  await $comment.insertComment({ feedId, content: text })
                  await $feed.getFeed(feedId)
                  setText('')
                }
              }}
            ></IonIcon>
          ),
        })}
      </div>
    </div>
  ))
}
