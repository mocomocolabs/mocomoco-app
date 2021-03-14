import { IText } from './TextBaseComponent'

export const TextXl: React.FC<IText> = ({ children, className = '' }) => (
  <div className={`${className} text-xl`}>{children}</div>
)
