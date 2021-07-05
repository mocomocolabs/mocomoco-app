import { IText } from './TextBaseComponent'

export const TextXl: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-xl`} style={style}>
    {children}
  </div>
)
