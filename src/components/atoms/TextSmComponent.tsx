import { IText } from './TextBaseComponent'

export const TextSm: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-sm`} style={style}>
    {children}
  </div>
)
