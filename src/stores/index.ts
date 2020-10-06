import { configure } from 'mobx'
import { Comment } from './comment-store'
import { Community } from './community-store'
import { News } from './example/news-store'
import { TodoList } from './example/todo-list-store'
import { Feed } from './feed-store'
import { Stuff } from './stuff-store'
import { Ui } from './ui-store'
import { User } from './user-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  $community: Community
  $feed: Feed
  $comment: Comment
  $stuff: Stuff
  $ui: Ui
  $user: User

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

    // example
    this.todoList = new TodoList()
    this.news = new News()
  }
}
