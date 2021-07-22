import { Link } from 'react-router-dom'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'

interface IMypageColumnItem {
  icon: string
  title: string
  href: string
}

export const MypageColumnItem: React.FC<IMypageColumnItem> = ({ icon, title, href }) => {
  return (
    <Link to={href} className='no-underline black'>
      <div className='flex-row w-100 items-center height-50'>
        <Icon name={icon} slot='start' />
        <TextBase className='ml-3'>{title}</TextBase>
      </div>
    </Link>
  )
}
