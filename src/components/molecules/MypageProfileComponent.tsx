import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'

export const MypageProfile: React.FC = () => {
  const { $auth, $user } = useStore()

  useEffect(() => {
    $user.getUser($auth.user.id)
  }, [$user, $auth.user.id])

  return useObserver(() =>
    $user.getUser.match({
      pending: () => <Spinner isFull={true}></Spinner>,
      resolved: () => (
        <div className='flex-col items-center' onClick={() => route.profileDetailEdit($user.user.id)}>
          <ProfileImage url={$user.user.profileUrl || undefined} className='width-88 height-88' />
          <div className='flex-col items-center w-full mt-2'>
            <TextBase className='flex-center leading-none text-bold'>
              {$user.user.nickname}
              <Icon name='edit' size={20} className='icon-secondary ml-1' />
            </TextBase>
            <TextSm className='flex-center leading-none gray mt-1'>
              <Icon name='location' size={16} className='icon-gray' />
              {$user.user.communities.map((community) => community.name).join('/')}
            </TextSm>
          </div>
        </div>
      ),
    })
  )
}
