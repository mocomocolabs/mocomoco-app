import { configure } from 'mobx'
import { News } from './example/news-store'
import { TodoList } from './example/todo-list-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  // community: Community

  todoList: TodoList
  news: News

  constructor() {
    // this.community = new Community()

    this.todoList = new TodoList()
    this.news = new News()
  }
}
