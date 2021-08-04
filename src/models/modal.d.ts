import { ReactElement } from 'react'

export interface IModal {
  isOpen: boolean
  title: string
  children?: ReactElement
}
