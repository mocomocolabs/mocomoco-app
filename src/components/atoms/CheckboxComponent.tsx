import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Icon, IconSize } from './IconComponent'
// TODO CheckBox, InputNormal, TextArea, Radio component 마다 react-hook-form register를 처리하는 방식이 다름.
export interface ICheckbox extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  label: string
  defaultChecked: boolean
  onChange?: (checked: boolean) => void
  size?: IconSize
  color?: 'primary' | 'secondary'
}

export const Checkbox: FC<ICheckbox> = ({
  label,
  defaultChecked,
  onChange,
  size: iconSize = 24,
  color = 'secondary',
}) => {
  const [checked, setChecked] = useState(!!defaultChecked)

  useEffect(() => {
    onChange && onChange(checked)
  }, [checked])

  return (
    <div className='flex items-center' onClick={() => setChecked(!checked)}>
      <Icon name={`check${checked ? '-solid' : ''}`} className={`icon-${color}`} size={iconSize} />
      <div className={`ml-1 ${iconSize === 16 ? 'text-sm' : iconSize === 24 ? 'text-base' : 'text-lg'}`}>
        {label}
      </div>
    </div>
  )
}
