import React from 'react'

export const TextSm = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`${className} text-sm`}>{children}</span>
)
