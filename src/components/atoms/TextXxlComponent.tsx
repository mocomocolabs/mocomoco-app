import React from 'react'
import { IText, TextBase } from './TextBaseComponent'

export const TextXxl: React.FC<IText> = ({ children, className = '' }) => (
  <TextBase className={`${className} text-xxl`}>{children}</TextBase>
)
