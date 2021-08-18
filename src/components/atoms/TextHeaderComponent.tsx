import { IText } from './TextBaseComponent'
import './TextHeaderComponent.scss'

export const TextHeader: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-header`} style={style}>
    {children}
  </div>
)
