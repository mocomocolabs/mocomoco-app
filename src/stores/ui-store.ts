import { action, observable } from 'mobx'
import { IPopover } from '../models/popover'

const initState = {
  popover: {
    open: false,
    event: undefined,
  } as IPopover,
}

export class Ui {
  @observable popover: IPopover = initState.popover

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
