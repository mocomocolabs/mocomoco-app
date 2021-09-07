import { FC, useEffect, useRef } from 'react'

interface IValidationMessage {
  message: string | undefined
  className?: string
  keepSpace?: boolean
}

export const ValidationMessage: FC<IValidationMessage> = ({ message, className = '', keepSpace = false }) => {
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    !!message && messageRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [message])

  return (
    <div
      hidden={!keepSpace && !!!message}
      className={`height-20 pt-1 px-3 text-xs red ${className}`}
      ref={messageRef}
    >
      {message}
    </div>
  )
}
