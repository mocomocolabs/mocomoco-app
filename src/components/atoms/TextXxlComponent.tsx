import React from 'react'

export const TextXxl = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`${className ? className : ''}  text-xxl`}>{children}</span>
)
