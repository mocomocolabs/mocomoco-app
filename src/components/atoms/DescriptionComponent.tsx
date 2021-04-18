export interface IDescription {
  children?: React.ReactNode
  className?: string
}

export const Description: React.FC<IDescription> = ({ children, className }): React.ReactElement => (
  <div className={`${className ? className : ''} text-base pre-line`}>{children}</div>
)
