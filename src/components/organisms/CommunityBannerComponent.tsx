import { IonIcon } from '@ionic/react'
import { people } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { ImageBackground } from '../atoms/ImageBackgroundComponent'
import { TextLg } from '../atoms/TextLgComponent'

export interface ICommunityBanner {}

export const CommunityBanner: FC<ICommunityBanner> = () => {
  const { $community } = useStore()

  return useObserver(() => (
    <div>
      <ImageBackground className='w-full height-100' url={$community.community?.bannerUrl}></ImageBackground>
      <div className='flex-between-center'>
        <div className='flex'>
          <IonIcon icon={people}></IonIcon>
          <TextLg>{$community.community?.userCount}</TextLg>
        </div>
        <TextLg>{$community.community?.name}</TextLg>
      </div>
    </div>
  ))
}
