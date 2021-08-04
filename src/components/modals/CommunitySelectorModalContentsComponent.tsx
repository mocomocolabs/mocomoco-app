import { useObserver } from 'mobx-react-lite'
import { FC, useMemo } from 'react'
import { useStore } from '../../hooks/use-store'
import { allCommunity } from '../../stores/community-store'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'

export const CommunitySelectorModalContents: FC = () => {
  const { $community, $auth, $ui } = useStore()

  const communites = useMemo(() => [allCommunity, ...$community.communities], [$community.communities])

  return useObserver(() => (
    <ul>
      {communites.map((v, i) => {
        const isSelected = v.id === $community.selectedId
        const isMyCommunity = v.id === $auth.user.communityId

        return (
          <li
            key={i}
            className='border-bottom py-3'
            onClick={() => {
              $community.setSelectedId(v.id)
              $ui.hideModal()
            }}
          >
            <div className='px-container flex-between-center'>
              <TextBase className={`flex-center ${!isSelected && 'gray'}`}>
                {isMyCommunity && (
                  <Icon
                    name={`${isSelected ? 'home-solid' : 'home'}`}
                    size={20}
                    className='icon-primary mr-1'
                  />
                )}
                {v.name}
              </TextBase>
              {isSelected && <Icon name='check-no-border' className='icon-secondary' />}
            </div>
          </li>
        )
      })}
    </ul>
  ))
}
