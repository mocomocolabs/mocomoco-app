import { IText } from './TextBaseComponent'

export const TextXxxl: React.FC<IText> = ({ children, className = '' }) => (
  <div className={`${className ? className : ''}  text-xxxl`}>{children}</div>
)
