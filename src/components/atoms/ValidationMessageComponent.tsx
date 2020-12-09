import React, { FC } from 'react'

export interface IValidationMessage {
  message?: string
}

export const ValidationMessage: FC<IValidationMessage> = ({ message }) => {
  return <div className='m-red'>{message}</div>
}
