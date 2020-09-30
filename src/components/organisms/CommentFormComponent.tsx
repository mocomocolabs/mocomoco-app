import { IonIcon, IonTextarea } from '@ionic/react'
import { paperPlane } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { Profile } from '../atoms/ProfileComponent'
import { Spinner } from '../atoms/SpinnerComponent'

export interface ICommentForm {
  feedId: number
}

export const CommentForm: React.FC<ICommentForm> = ({ feedId }) => {
  const [text, setText] = useState<string>()
  const { feed } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center bg-white'>
      <Profile url='assets/mock/profile1.jpeg'></Profile>

      <IonTextarea
        className='ml-2 bg-m-gray br-lg px-3 black leading-8'
        autoGrow={true}
        rows={1}
        value={text}
        onIonChange={(e) => {
          setText(e.detail.value!)
        }}
      ></IonTextarea>

      <div className='ml-2'>
        {feed.insertComment.match({
          pending: () => <Spinner></Spinner>,
          resolved: () => (
            <IonIcon
              icon={paperPlane}
              className='black'
              onClick={() => {
                if (text) {
                  feed.insertComment({ feedId, content: text })
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
