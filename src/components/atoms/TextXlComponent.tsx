import React from 'react'

export const TextXl = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`${className ? className : ''}  text-xl`}>{children}</span>
)
