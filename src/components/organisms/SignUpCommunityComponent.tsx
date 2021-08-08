import { Observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { Icon } from '../atoms/IconComponent'
import { Pad } from '../atoms/PadComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'

export const SignUpCommunity: FC = () => {
  const { $community, $auth } = useStore()

  const [selectedId, setSelectedId] = useState<number>(0)

  return (
    <>
      <Observer>
        {() => (
          <ul className='pt-2'>
            {$community.communities.map((v) => (
              <li
                key={v.id}
                className='py-2'
                onClick={() => {
                  setSelectedId(v.id)
                  $auth.setSignUpForm({ communityIds: [v.id] })
                }}
              >
                <div className='flex-between-center pb-2'>
                  <TextLg className='gray py-2'>{v.name}</TextLg>
                  {v.id === selectedId && <Icon name='check-solid' className='icon-secondary'></Icon>}
                </div>
                <XDivider />
              </li>
            ))}
          </ul>
        )}
      </Observer>

      <Pad className='height-40'></Pad>

      <TaskObserver taskTypes={[$auth.signUp, $auth.signIn]} spinnerPosition='centerX'>
        {() => (
          <SubmitButton
            disabled={!selectedId}
            text='회원가입 완료하기'
            color='secondary'
            size='large'
            onClick={() => {
              executeWithError(async () => {
                await $auth.signUp($auth.signUpForm)
                await $auth.signIn($auth.signUpForm.email!, $auth.signUpForm.password!)
                route.signUpComplete()
              })
            }}
          ></SubmitButton>
        )}
      </TaskObserver>
    </>
  )
}
