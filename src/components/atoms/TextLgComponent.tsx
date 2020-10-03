import React from 'react'
import { IText, TextBase } from './TextBaseComponent'

export const TextLg: React.FC<IText> = ({ children, className = '' }) => (
  <TextBase className={`${className} text-lg`}>{children}</TextBase>
)
