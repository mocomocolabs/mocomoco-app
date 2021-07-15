export interface IText {
  children?: React.ReactNode
  className?: string
  style?: Record<string, unknown> // same as {}
}

export const TextBase: React.FC<IText> = ({ children, className = '', style = {} }): React.ReactElement => (
  <div className={`${className} text-base`} style={style}>
    {children}
  </div>
)
