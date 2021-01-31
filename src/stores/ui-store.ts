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
  } as IToast,

  isBottomTab: true,
}

export class Ui {
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
  }

  @action
  showToastError = (toast: Partial<IToast>) => {
    this.toast = {
      ...toast,
      color: 'danger',
      isOpen: true,
    }
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
