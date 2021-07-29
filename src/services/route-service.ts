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

  /**
   * @param isReplace 현재 location history 교체 여부
   */
  // eslint-disable-next-line
  route(url: string, param?: any, isReplace = false) {
    this.history[isReplace ? 'replace' : 'push'](url, param)
  }

  intro() {
    this.route('/intro')
  }

  signIn() {
    this.route('/sign-in')
  }

  signUp() {
    this.route('/sign-up')
  }

  signUpForm() {
    this.route('/sign-up/form')
  }

  signUpEmail() {
    this.route('/sign-up/email')
  }

  signUpCommunity() {
    this.route('/sign-up/community')
  }

  signUpComplete() {
    this.route('/sign-up/complete')
  }

  termPrivacy() {
    this.route('/term/privacy')
  }

  termUse() {
    this.route('/term/use')
  }

  home() {
    this.route('/tabs/home')
  }

  feed() {
    this.route('/tabs/feed')
  }

  feedForm() {
    this.route('/tabs/feed/form')
  }

  feedDetail(feedId: number, param?: { autoFocus?: boolean }, isReplace = false) {
    this.route(`/tabs/feed/${feedId}`, { autoFocus: param?.autoFocus }, isReplace)
  }

  stuff() {
    this.route('/tabs/stuff')
  }

  stuffForm() {
    this.route('/tabs/stuff/form')
  }

  stuffDetail(stuffId: number) {
    this.route(`/tabs/stuff/${stuffId}`)
  }

  talent() {
    this.route('/tabs/talent')
  }

  talentForm() {
    this.route('/tabs/talent/form')
  }

  talentDetail(talentId: number) {
    this.route(`/tabs/talent/${talentId}`)
  }

  chatRoom(roomId: number) {
    this.route(`/tabs/chat/${roomId}`)
  }

  clubs() {
    this.route(`/tabs/club`)
  }

  clubForm() {
    this.route(`/tabs/club/form`)
  }

  clubDetail(clubId: number) {
    this.route(`/tabs/club/${clubId}`)
  }

  myPageMyList() {
    this.route('/tabs/my-page/my-list')
  }

  myPageLikeList() {
    this.route('/tabs/my-page/like-list')
  }

  profileDetail(userId: number) {
    this.route(`/users/${userId}`)
  }

  profileDetailEdit(userId: number) {
    this.route(`/users/${userId}/edit`)
  }

  get history() {
    return this._history
  }
}

export const route = new RouteService()
