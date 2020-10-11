import { action, observable } from 'mobx'
import { IAlert } from '../models/alert'
import { IPopover, IPopoverResult } from '../models/popover'

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
  },

  isBottomTab: true,
}

export class Ui {
  @observable popover: IPopover = initState.popover
  @observable alert: IAlert = initState.alert
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
