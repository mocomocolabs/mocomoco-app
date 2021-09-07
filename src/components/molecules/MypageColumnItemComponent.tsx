import { Link } from 'react-router-dom'
import { Icon } from '../atoms/IconComponent'
import { TextBase } from '../atoms/TextBaseComponent'

interface IMypageColumnItem {
  icon: string
  title: string
  href: string
  disabled?: boolean
}

export const MypageColumnItem: React.FC<IMypageColumnItem> = ({ icon, title, href, disabled = false }) => {
  return (
    <Link
      to={href}
      className={`no-underline textcolor ${disabled ? 'opacity-30' : ''}`}
      onClick={(e) => disabled && e.preventDefault()}
    >
      <div className='flex-row w-100 items-center height-50'>
        <Icon name={icon} slot='start' color='secondary' />
        <TextBase className='ml-3'>{title}</TextBase>
      </div>
    </Link>
  )
}
