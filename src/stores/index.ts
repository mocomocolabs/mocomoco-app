import { configure } from 'mobx'
import { Community } from './community-store'
import { News } from './example/news-store'
import { TodoList } from './example/todo-list-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  community: Community

  // example
  todoList: TodoList
  news: News

  constructor() {
    this.community = new Community()

    // example
    this.todoList = new TodoList()
    this.news = new News()
  }
}
