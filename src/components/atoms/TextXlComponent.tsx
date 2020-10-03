import React from 'react'
import { IText, TextBase } from './TextBaseComponent'

export const TextXl: React.FC<IText> = ({ children, className = '' }) => (
  <TextBase className={`${className} text-xl`}>{children}</TextBase>
)
