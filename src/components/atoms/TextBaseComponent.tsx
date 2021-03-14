export interface IText {
  children?: React.ReactNode
  className?: string
}

export const TextBase: React.FC<IText> = ({ children, className }): React.ReactElement => (
  <div className={`${className ? className : ''} text-base`}>{children}</div>
)
