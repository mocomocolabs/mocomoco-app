import { IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { storage } from '../../services/storage-service'
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
              storage.setCommunityId(v.id)
              $auth.setSignUpForm({ communityIds: [v.id] })
            }}
          >
            <div className='flex-between-center'>
              <TextLg>{v.name}</TextLg>
              {v.id === storage.communityId && <IonIcon icon={checkmark}></IonIcon>}
            </div>
          </li>
        ))}
      </ul>
      <SubmitButton
        disabled={!storage.communityId}
        text='가입하기'
        onClick={() => {
          route.signUpForm()
        }}
      ></SubmitButton>
    </>
  ))
}
