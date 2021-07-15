import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Icon } from './IconComponent'
// TODO CheckBox, InputNormal, TextArea, Radio component 마다 react-hook-form register를 처리하는 방식이 다름.
export interface ICheckbox extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  label: string
  defaultChecked: boolean
  onChange?: (checked: boolean) => void
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary'
}

export const Checkbox: FC<ICheckbox> = ({
  label,
  defaultChecked,
  onChange,
  size = 'medium',
  color = 'secondary',
}) => {
  const [checked, setChecked] = useState(!!defaultChecked)

  useEffect(() => {
    onChange && onChange(checked)
  }, [checked, onChange])

  return (
    <div className='flex items-center' onClick={() => setChecked(!checked)}>
      <Icon name={`check${checked ? '-solid' : ''}`} className={`icon-${color}`} size={size} />
      <div className={`ml-1 ${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base'}`}>
        {label}
      </div>
    </div>
  )
}
