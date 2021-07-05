import { IText } from './TextBaseComponent'

export const TextLg: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-lg`} style={style}>
    {children}
  </div>
)
