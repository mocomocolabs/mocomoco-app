import React, { FC } from 'react'
import { FieldErrors } from 'react-hook-form'

export interface IValidationMessage {
  isShow: boolean | undefined | FieldErrors
  message?: string
}

export const ValidationMessage: FC<IValidationMessage> = ({ isShow, message }) => {
  return isShow ? <div className='m-red'>{message}</div> : <></>
}
