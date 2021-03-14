import { IText } from './TextBaseComponent'

export const TextLg: React.FC<IText> = ({ children, className = '' }) => (
  <div className={`${className} text-lg`}>{children}</div>
)
