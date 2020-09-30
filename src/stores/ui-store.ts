import { action, observable } from 'mobx'
import { IPopover } from '../models/popover'

const initState = {
  popover: {
    open: false,
    event: undefined,
  } as IPopover,

  isBottomTab: true,
}

export class Ui {
  @observable popover: IPopover = initState.popover
  @observable isBottomTab = initState.isBottomTab

  @action
  setIsBottomTab = (isShow: boolean) => {
    this.isBottomTab = isShow
  }

  @action
  showPopover = (event: Event) => {
    this.popover = {
      open: true,
      event,
    }
  }

  @action
  hidePopover = () => {
    this.popover = initState.popover
  }
}
