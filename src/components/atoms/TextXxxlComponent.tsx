import React from 'react'
import { IText } from './TextBaseComponent'

export const TextXxxl: React.FC<IText> = ({ children, className = '' }) => (
  <span className={`${className ? className : ''}  text-xxxl`}>{children}</span>
)
