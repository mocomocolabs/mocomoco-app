import { FC } from 'react'

export interface IHeaderSubmitText {
  isSubmittable: boolean
  onSubmit: () => void
  text?: string
}

export const HeaderSubmitText: FC<IHeaderSubmitText> = ({ isSubmittable, onSubmit, text = '완료' }) => (
  <div
    className={`${isSubmittable ? '' : 'gray'} text-xl`}
    onClick={(e) => {
      e.preventDefault()
      isSubmittable && onSubmit()
    }}
    slot='end'
  >
    {text}
  </div>
)
