import { createBrowserHistory, History } from 'history'

class RouteService {
  private _history: History

  constructor() {
    this._history = createBrowserHistory({})
  }

  goBack() {
    // TODO: modal의 open 상태를 store로 관리하여. hardware back 버튼을 제어할 필요가 있음
    // TODO: go back 시 다소 늦게 화면이 렌더링 되는것 같음.. production 빌드시에도 체크하고 방안을 모색해볼것
    this.history.goBack()
  }

  home() {
    this.history.push('/home')
  }

  signIn() {
    this.history.push('/sign-in')
  }

  signUp() {
    this.history.push('/sign-up')
  }

  signUpForm() {
    this.history.push('/sign-up/form')
  }

  signUpEmail() {
    this.history.push('/sign-up/email')
  }

  signUpCommunity() {
    this.history.push('/sign-up/community')
  }

  feed() {
    this.history.push('/feed')
  }

  feedForm() {
    this.history.push('/feed-write')
  }

  feedDetail(feedId: number, param?: { autoFocus?: boolean }) {
    this.history.push(`/feed/${feedId}`, { autoFocus: param?.autoFocus })
  }

  stuffDetail(stuffId: number) {
    this.history.push(`/stuff/${stuffId}`)
  }

  talentDetail(talentId: number) {
    this.history.push(`/talent/${talentId}`)
  }

  profileDetail(userId: number) {
    this.history.push(`/users/${userId}`)
  }

  profileDetailEdit(userId: number) {
    this.history.push(`/users/${userId}/edit`)
  }

  chatRoom(roomId: number) {
    this.history.push(`/chat/${roomId}`)
  }

  clubs() {
    this.history.push(`/club`)
  }

  clubForm() {
    this.history.push(`/club-form`)
  }

  clubDetail(clubId: number) {
    this.history.push(`/club/${clubId}`)
  }

  get history() {
    return this._history
  }
}

export const route = new RouteService()
