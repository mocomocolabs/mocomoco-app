import { configure } from 'mobx'
import { Auth } from './auth-store'
import { Chat } from './chat-store'
import { Club } from './club-store'
import { Comment } from './comment-store'
import { Community } from './community-store'
import { News } from './example/news-store'
import { TodoList } from './example/todo-list-store'
import { Feed } from './feed-store'
import { Stuff } from './stuff-store'
import { Talent } from './talent-store'
import { Ui } from './ui-store'
import { User } from './user-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  $community: Community
  $feed: Feed
  $comment: Comment
  $stuff: Stuff
  $talent: Talent
  $chat: Chat
  $ui: Ui
  $user: User
  $auth: Auth
  $club: Club

  // example
  todoList: TodoList
  news: News

  constructor() {
    this.$community = new Community()
    this.$feed = new Feed()
    this.$comment = new Comment()
    this.$ui = new Ui()
    this.$user = new User()
    this.$stuff = new Stuff()
    this.$talent = new Talent()
    this.$chat = new Chat()
    this.$auth = new Auth()
    this.$club = new Club()

    // example
    this.todoList = new TodoList()
    this.news = new News()
  }
}
