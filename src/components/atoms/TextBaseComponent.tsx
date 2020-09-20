import React from 'react'

export const Text = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`${className} text-base`}>{children}</span>
)
