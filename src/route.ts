import { createBrowserHistory, History } from 'history'

class Route {
  private _history: History

  constructor() {
    this._history = createBrowserHistory({})
  }

  goBack() {
    this.history.goBack()
  }

  feedForm() {
    this.history.push('/feed/write')
  }

  feedDetail(feedId: number, param?: { autoFocus?: boolean }) {
    this.history.push(`/feed/${feedId}`, { autoFocus: param?.autoFocus })
  }

  get history() {
    return this._history
  }
}

export const route = new Route()
