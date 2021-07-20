import { useObserver } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { useStore } from '../../hooks/use-store'
import { allCommunity } from '../../stores/community-store'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { Modal } from './ModalComponent'

export interface ICommunitySelectorModal {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const CommunitySelectorModal: FC<ICommunitySelectorModal> = ({ isShow, setIsShow }) => {
  const { $community, $auth } = useStore()

  const communites = useMemo(() => [allCommunity, ...$community.communities], [$community.communities])

  return useObserver(() => (
    <Modal isShow={isShow} setIsShow={setIsShow} title='공동체 선택'>
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
                setIsShow(false)
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
    </Modal>
  ))
}
