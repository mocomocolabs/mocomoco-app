import { IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { TextLg } from '../atoms/TextLgComponent'

export const SignUpCommunity: FC = () => {
  const { $community } = useStore()

  return useObserver(() => (
    <ul className='px-container pt-2'>
      {$community.communities.map((v) => (
        <li
          key={v.id}
          className='py-2'
          onClick={() => {
            // $community.setSelectedId(v.id)
            // setIsShow(false)
          }}
        >
          <div className='flex-between-center'>
            <TextLg>{v.name}</TextLg>
            {v.id === $community.selectedId && <IonIcon icon={checkmark}></IonIcon>}
          </div>
        </li>
      ))}
    </ul>
  ))
}
