import { action, observable } from 'mobx'
import { IAlert } from '../models/alert'
import { IPopover, IPopoverResult } from '../models/popover'
import { IToast } from '../models/toast'

const initState = {
  popover: {
    isOpen: false,
    event: undefined,
  } as IPopover,

  alert: {
    isOpen: false,
    header: '',
    message: '',
    onSuccess: () => {},
    onFail: () => {},
  } as IAlert,

  toast: {
    isOpen: false,
    message: '',
    color: 'primary',
    duration: 0,
  } as IToast,

  isBottomTab: true,
}

export class UiStore {
  @observable popover: IPopover = initState.popover
  @observable alert: IAlert = initState.alert
  @observable toast: IToast = initState.toast
  @observable isBottomTab = initState.isBottomTab

  @action
  setIsBottomTab = (isShow: boolean) => {
    this.isBottomTab = isShow
  }

  @action
  showAlert = (alert: IAlert) => {
    this.alert = alert
  }

  @action
  hideAlert = () => {
    this.alert = initState.alert
  }

  @action
  showToastSuccess = (toast: Partial<IToast>) => {
    this.toast = {
      ...toast,
      color: 'success',
      isOpen: true,
    }

    this.closeToast(toast)
  }

  @action
  showToastError = (toast: Partial<IToast>) => {
    this.toast = {
      ...toast,
      color: 'danger',
      isOpen: true,
    }

    this.closeToast(toast)
  }

  @action
  closeToast = (toast: Partial<IToast>) => {
    setTimeout(
      action(() => {
        this.toast.isOpen = false
      }),
      toast.duration ? toast.duration : 3000
    )
  }

  @action
  showPopover = (event: Event) => {
    return new Promise((resolve: (value: IPopoverResult) => void) => {
      this.popover = {
        isOpen: true,
        event,
        resolve,
      }
    })
  }

  @action
  hidePopover = (value?: IPopoverResult) => {
    if (this.popover.resolve) {
      this.popover.resolve(value)
    }
    this.popover = initState.popover
  }
}
