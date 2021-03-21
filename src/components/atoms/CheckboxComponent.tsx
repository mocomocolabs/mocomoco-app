import React, { FC, HTMLAttributes } from 'react'
import { Icon } from './IconComponent'
import { TextBase } from './TextBaseComponent'

export interface ICheckbox extends HTMLAttributes<HTMLElement> {
  checked: boolean
  label: string
}

export const Checkbox: FC<ICheckbox> = ({ checked, label, onClick }) => {
  return (
    <div className='flex items-center' onClick={onClick}>
      {checked ? (
        <Icon name='check-solid' className='icon-yellow'></Icon>
      ) : (
        <Icon name='check' className='icon-yellow'></Icon>
      )}
      <TextBase className='ml-1'>{label}</TextBase>
    </div>
  )
}
