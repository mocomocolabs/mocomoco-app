import { configure } from 'mobx'
import { StuffTalentPageKey as PageKey } from './../models/stufftalent.d'
import { AuthStore } from './auth-store'
import { ChatStore } from './chat-store'
import { ClubStore } from './club-store'
import { CommentStore } from './comment-store'
import { CommunityStore } from './community-store'
import { FeedStore } from './feed-store'
import { SegmentStore } from './segment-store'
import { StuffTalentStore } from './stufftalent-store'
import { UiStore } from './ui-store'
import { UserStore } from './user-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  $auth: AuthStore
  $community: CommunityStore
  $feed: FeedStore
  $comment: CommentStore
  $stuff: StuffTalentStore
  $talent: StuffTalentStore
  $chat: ChatStore
  $ui: UiStore
  $user: UserStore
  $club: ClubStore
  $segment: SegmentStore

  constructor() {
    this.$auth = new AuthStore()
    this.$community = new CommunityStore(this)
    this.$feed = new FeedStore(this)
    this.$comment = new CommentStore()
    this.$ui = new UiStore()
    this.$user = new UserStore()
    this.$stuff = new StuffTalentStore(PageKey.STUFF)
    this.$talent = new StuffTalentStore(PageKey.TALENT)
    this.$chat = new ChatStore()
    this.$club = new ClubStore(this)
    this.$segment = new SegmentStore()
  }
}
