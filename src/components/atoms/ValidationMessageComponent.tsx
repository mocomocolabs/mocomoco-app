import { FC } from 'react'
import { FieldErrors } from 'react-hook-form'
import { TextXs } from './TextXsComponent'

export interface IValidationMessage {
  isShow: boolean | undefined | FieldErrors
  message?: string
}

export const ValidationMessage: FC<IValidationMessage> = ({ isShow, message }) => {
  return isShow ? <TextXs className='red -mt-3 mb-4'>{message}</TextXs> : <></>
}
