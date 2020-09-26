import React from 'react'

export const TextBase = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`${className ? className : ''} text-base`}>{children}</span>
)
