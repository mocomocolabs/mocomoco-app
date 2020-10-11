import { createBrowserHistory, History } from 'history'

class Route {
  private _history: History

  constructor() {
    this._history = createBrowserHistory({})
  }

  goBack() {
    this.history.goBack()
  }

  feed() {
    this.history.push('/feed')
  }

  feedForm() {
    this.history.push('/feed/write')
  }

  feedDetail(feedId: number, param?: { autoFocus?: boolean }) {
    this.history.push(`/feed/${feedId}`, { autoFocus: param?.autoFocus })
  }

  tradeDetail(path: string, tradeId: number) {
    this.history.push(`/trade/${path}/${tradeId}`)
  }

  profileDetail(userId: number) {
    this.history.push(`/users/${userId}`)
  }

  profileDetailEdit(userId: number) {
    this.history.push(`/users/${userId}/edit`)
  }

  get history() {
    return this._history
  }
}

export const route = new Route()
