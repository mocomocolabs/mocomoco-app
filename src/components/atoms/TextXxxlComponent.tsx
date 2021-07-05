import { IText } from './TextBaseComponent'

export const TextXxxl: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-xxxl`} style={style}>
    {children}
  </div>
)
