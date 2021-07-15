import React from 'react'
import { IText } from './TextBaseComponent'

export const TextXs: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-xs`} style={style}>
    {children}
  </div>
)
