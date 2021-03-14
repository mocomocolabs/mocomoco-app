import { IText } from './TextBaseComponent'

export const TextXxl: React.FC<IText> = ({ children, className = '' }) => (
  <div className={`${className} text-xxl`}>{children}</div>
)
