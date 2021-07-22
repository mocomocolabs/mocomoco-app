import { Icon } from '../atoms/IconComponent'
import { TextSm } from '../atoms/TextSmComponent'

interface IMypageRowItem {
  icon: string
  title: string
  onClick?: () => void
}

export const MypageRowItem: React.FC<IMypageRowItem> = ({ icon, title, onClick }) => {
  return (
    <div className='flex-col items-center gap-1' onClick={onClick}>
      <Icon name={icon} size={32} className='icon-secondary' />
      <TextSm>{title}</TextSm>
    </div>
  )
}
