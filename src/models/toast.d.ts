export interface IToast {
  isOpen: boolean
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'light'
    | 'medium'
    | 'dark'
    | 'textprimary'
  message?: string
  duration?: number
}
