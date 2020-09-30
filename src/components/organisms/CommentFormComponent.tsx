import { IonIcon, IonTextarea } from '@ionic/react'
import { paperPlane } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { Profile } from '../atoms/ProfileComponent'

export interface ICommentForm {}

export const CommentForm: FC<ICommentForm> = () => {
  const [text, setText] = useState<string>()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center bg-white'>
      <Profile url='assets/mock/profile1.jpeg'></Profile>

      <IonTextarea
        className='ml-2 bg-m-gray br-lg px-3 black'
        autoGrow={true}
        rows={1}
        placeholder='Enter more information here...'
        value={text}
        onIonChange={(e) => setText(e.detail.value!)}
      ></IonTextarea>

      <IonIcon icon={paperPlane} className='ml-2 black'></IonIcon>
    </div>
  ))
}
