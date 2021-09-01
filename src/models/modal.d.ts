import { ReactElement } from 'react'

export interface IModal {
  isOpen: boolean
  title: string
  submit?: (submittable: boolean) => ReactElement
  submittable?: boolean
  render?: () => ReactElement
}
