export interface IAlert {
  isOpen: boolean
  header?: string
  message: string
  onSuccess: () => void
  onFail?: () => void
}
