import { Observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'
import { Pad } from '../atoms/PadComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { TextLg } from '../atoms/TextLgComponent'
import { XDivider } from '../atoms/XDividerComponent'

export const SignUpCommunity: FC = () => {
  const { $community, $auth } = useStore()

  return (
    <Observer>
      {() => (
        <>
          <ul className='pt-2'>
            {$community.communities.map((v) => (
              <li
                key={v.id}
                className='py-2'
                onClick={() => {
                  $auth.setSignUpForm({ communityIds: [v.id] })
                }}
              >
                <div className='flex-between-center pb-2'>
                  <TextLg className='gray py-2'>{v.name}</TextLg>
                  {v.id === $auth.signUpForm.communityIds?.[0] && (
                    <Icon name='check-solid' className='icon-secondary'></Icon>
                  )}
                </div>
                <XDivider />
              </li>
            ))}
          </ul>

          <Pad className='height-40'></Pad>

          <SubmitButton
            disabled={!$auth.signUpForm.communityIds}
            color='secondary'
            size='large'
            text='계속하기'
            onClick={() => route.signUpIntroduce()}
          />
        </>
      )}
    </Observer>
  )
}
