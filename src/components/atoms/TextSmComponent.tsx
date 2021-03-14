import { IText } from './TextBaseComponent'

export const TextSm: React.FC<IText> = ({ children, className = '' }) => (
  <div className={`${className} text-sm`}>{children}</div>
)
