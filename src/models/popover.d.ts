import { ReactElement } from 'react'

export interface IPopover {
  isOpen: boolean
  event: Event | undefined
  cssClass?: string
  animated?: boolean
  showBackdrop?: boolean
  children?: ReactElement
}
