import React from 'react'
import { IText } from './TextBaseComponent'

export const TextXs: React.FC<IText> = ({ children, className = '' }) => (
  <div className={`${className} text-xs`}>{children}</div>
)
