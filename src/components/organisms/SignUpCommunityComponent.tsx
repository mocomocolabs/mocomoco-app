import { IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../route'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { TextXxl } from '../atoms/TextXxlComponent'

export const SignUpCommunity: FC = () => {
  const { $community, $auth } = useStore()

  return useObserver(() => (
    <>
      <TextXxl>소속되신 공동체는 어디신가요?</TextXxl>
      <ul className='px-container pt-2'>
        {$community.communities.map((v) => (
          <li
            key={v.id}
            className='py-2'
            onClick={() => {
              $community.setSelectedId(v.id)
              $auth.setSignUpForm({ communityIds: [v.id] })
            }}
          >
            <div className='flex-between-center'>
              <TextLg>{v.name}</TextLg>
              {v.id === $community.selectedId && <IonIcon icon={checkmark}></IonIcon>}
            </div>
          </li>
        ))}
      </ul>
      <SubmitButton
        disabled={!$community.selectedId}
        text='가입하기'
        onClick={() => {
          route.signUpForm()
        }}
      ></SubmitButton>
    </>
  ))
}
