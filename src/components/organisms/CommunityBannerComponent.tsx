import { IonIcon } from '@ionic/react'
import { people } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { TextBase } from '../atoms/TextBaseComponent'

export interface ICommunityBanner {}

export const CommunityBanner: FC<ICommunityBanner> = () => {
  const { community } = useStore()

  return useObserver(() => (
    <div>
      <div
        className='w-full height-100'
        style={{
          backgroundImage: `url(${community.community?.bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className='flex-between-center'>
        <div className='flex'>
          <IonIcon icon={people}></IonIcon>
          <TextBase>{community.community?.count}</TextBase>
        </div>
        <TextBase>{community.community?.name}</TextBase>
      </div>
    </div>
  ))
}
