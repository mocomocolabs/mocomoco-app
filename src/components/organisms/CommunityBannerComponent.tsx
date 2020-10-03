import { IonIcon } from '@ionic/react'
import { people } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { ImageBackground } from '../atoms/ImageBackgroundComponent'
import { TextBase } from '../atoms/TextBaseComponent'

export interface ICommunityBanner {}

export const CommunityBanner: FC<ICommunityBanner> = () => {
  const { $community } = useStore()

  return useObserver(() => (
    <div>
      <ImageBackground className='w-full height-100' url={$community.community?.bannerUrl}></ImageBackground>
      <div className='flex-between-center'>
        <div className='flex'>
          <IonIcon icon={people}></IonIcon>
          <TextBase>{$community.community?.count}</TextBase>
        </div>
        <TextBase>{$community.community?.name}</TextBase>
      </div>
    </div>
  ))
}
