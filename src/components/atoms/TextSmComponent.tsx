import React from 'react'
import { IText, TextBase } from './TextBaseComponent'

export const TextSm: React.FC<IText> = ({ children, className = '' }) => (
  <TextBase className={`${className} text-sm`}>{children}</TextBase>
)
