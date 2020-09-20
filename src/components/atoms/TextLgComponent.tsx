import React from 'react'

export const TextLg = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <span className={`${className} text-lg`}>{children}</span>
)
