import { FC } from 'react'

export interface IHeaderSubmitText {
  isSubmittable: boolean
  onSubmit: () => void
  text?: string
}

export const HeaderSubmitText: FC<IHeaderSubmitText> = ({ isSubmittable, onSubmit, text = '완료' }) => {
  return (
    <div
      className={`${isSubmittable ? '' : 'gray'} text-base`}
      onClick={() => isSubmittable && onSubmit()}
      slot='end'
    >
      {text}
    </div>
  )
}
