import React from 'react'

export interface IText {
  children?: React.ReactNode
  className?: string
}

export const TextBase: React.FC<IText> = ({ children, className }): React.ReactElement => (
  <span className={`${className ? className : ''} text-base`}>{children}</span>
)
