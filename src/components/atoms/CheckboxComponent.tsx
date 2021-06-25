import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Icon } from './IconComponent'
import { TextBase } from './TextBaseComponent'

// TODO CheckBox, InputNormal, TextArea, Radio component 마다 react-hook-form register를 처리하는 방식이 다름.
export interface ICheckbox extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  label: string
  defaultChecked: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox: FC<ICheckbox> = ({ label, defaultChecked, onChange }) => {
  const [checked, setChecked] = useState(!!defaultChecked)

  useEffect(() => {
    onChange && onChange(checked)
  }, [checked, onChange])

  return (
    <div className='flex items-center' onClick={() => setChecked(!checked)}>
      {checked ? (
        <Icon name='check-solid' className='icon-primary'></Icon>
      ) : (
        <Icon name='check' className='icon-primary'></Icon>
      )}
      <TextBase className='ml-1'>{label}</TextBase>
    </div>
  )
}
