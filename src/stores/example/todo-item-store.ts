import { action, observable } from 'mobx'

export class TodoItem {
  id = Date.now()

  @observable text = ''
  @observable isDone = false

  constructor(text: string) {
    this.text = text
  }

  @action
  toggleIsDone = () => {
    this.isDone = !this.isDone
  }

  @action
  updateText = (text: string) => {
    this.text = text
  }
}
