import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Icon } from './IconComponent'
import { TextBase } from './TextBaseComponent'

// TODO CheckBox, InputNormal, TextArea, Radio component 마다 react-hook-form register를 처리하는 방식이 다름.
export interface ICheckbox extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  name: string
  label: string
  defaultChecked: boolean
  onChange?: (checked: boolean) => void
  required?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
}

export const Checkbox: FC<ICheckbox> = ({
  name,
  label,
  defaultChecked,
  onChange,
  required = false,
  register,
}) => {
  const [checked, setChecked] = useState(!!defaultChecked)
  const formRegister =
    register &&
    register(name, {
      required: required,
      value: checked, // TODO 이 부분을 컴포넌트 호출부에서 설정해줄 수 있을까?
    })

  useEffect(() => {
    onChange && onChange(checked)
  }, [checked, onChange])

  return (
    <div className='flex items-center' onClick={() => setChecked(!checked)}>
      <input type='hidden' {...formRegister} />

      {checked ? (
        <Icon name='check-solid' className='icon-yellow'></Icon>
      ) : (
        <Icon name='check' className='icon-yellow'></Icon>
      )}
      <TextBase className='ml-1'>{label}</TextBase>
    </div>
  )
}
