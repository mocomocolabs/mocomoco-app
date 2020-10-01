export interface IPopover {
  isOpen: boolean
  event: Event | undefined
  resolve?: (value: IPopoverResult) => void
}

export type IPopoverResult = 'EDIT' | 'DELETE' | undefined
