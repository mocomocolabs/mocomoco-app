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

  home() {
    this.route('/home')
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

  feed() {
    this.route('/feed')
  }

  feedForm() {
    this.route('/feed-write')
  }

  feedDetail(feedId: number, param?: { autoFocus?: boolean }, isReplace = false) {
    this.route(`/feed/${feedId}`, { autoFocus: param?.autoFocus }, isReplace)
  }

  stuff() {
    this.route('/stuff')
  }

  stuffForm() {
    this.route('/stuff-form')
  }

  stuffDetail(stuffId: number) {
    this.route(`/stuff/${stuffId}`)
  }

  talent() {
    this.route('/talent')
  }

  talentForm() {
    this.route('/talent-form')
  }

  talentDetail(talentId: number) {
    this.route(`/talent/${talentId}`)
  }

  profileDetail(userId: number) {
    this.route(`/users/${userId}`)
  }

  profileDetailEdit(userId: number) {
    this.route(`/users/${userId}/edit`)
  }

  chatRoom(roomId: number) {
    this.route(`/chat/${roomId}`)
  }

  clubs() {
    this.route(`/club`)
  }

  clubForm() {
    this.route(`/club-form`)
  }

  clubDetail(clubId: number) {
    this.route(`/club/${clubId}`)
  }

  myPageMyList() {
    this.route('/my-page/my-list')
  }

  myPageLikeList() {
    this.route('/my-page/like-list')
  }

  get history() {
    return this._history
  }
}

export const route = new RouteService()
