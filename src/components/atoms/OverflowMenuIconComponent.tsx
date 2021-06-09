import { IonIcon } from '@ionic/react'
import { ellipsisVertical } from 'ionicons/icons'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'

export interface IOverflowMenuIcon {
  show?: boolean
  className?: string
  icon?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit?: any
}

export const OverflowMenuIcon: FC<IOverflowMenuIcon> = ({
  show = true,
  className = '',
  icon = ellipsisVertical,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const { $ui } = useStore()

  const showItemMenuPopup = async (e: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    console.log('showItemMenuPopup')
    const action = await $ui.showPopover(e.nativeEvent)
    console.log('showItemMenuPopup action', action)

    switch (action) {
      case 'DELETE':
        $ui.showAlert({
          isOpen: true,
          message: '게시글을 삭제하시겠어요?',
          onSuccess: onDelete,
        })
        break
      case 'EDIT':
        onEdit()
        break
    }
  }

  return <IonIcon hidden={!show} className={className} icon={icon} onClick={showItemMenuPopup} />
}
