import { IText } from './TextBaseComponent'

export const TextXxl: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-xxl`} style={style}>
    {children}
  </div>
)
