import React from 'react'
import { IText } from './TextBaseComponent'

export const TextXxs: React.FC<IText> = ({ children, className = '', style = {} }) => (
  <div className={`${className} text-xxs`} style={style}>
    {children}
  </div>
)
