import { FC, useEffect, useRef } from 'react'
import { FieldError } from 'react-hook-form'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'

interface IFieldErrorMessage {
  error: FieldError | undefined
  className?: string
}

export const FieldErrorMessage: FC<IFieldErrorMessage> = ({ error, className = '' }) => {
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('error?', error)
    !!error && messageRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [error])

  return (
    <div hidden={!!!error} className={`height-20 pt-1 px-3 ${className}`} ref={messageRef}>
      <ValidationMessage isShow={!!error} message={error?.message} />
    </div>
  )
}
