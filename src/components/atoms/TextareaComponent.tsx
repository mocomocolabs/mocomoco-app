import { IonTextarea } from '@ionic/react'
import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import './TextareaComponent.scss'

export interface ITextarea {
  onChange?: (v: string | null | undefined) => void
  register?: UseFormRegisterReturn
  rows?: number
  maxLength?: number
  value?: string
  placeholder?: string
  autoGrow?: boolean
}

export const Textarea: FC<ITextarea> = ({ onChange, register, ...props }) => {
  return (
    <IonTextarea
      className='w-full py-4 m-0 textarea-component'
      onIonChange={(e) => onChange && onChange(e.detail?.value)}
      {...props}
      {...register}
    />
  )
}
