import { configure } from 'mobx'

import { News } from './example/news-store'
import { TodoList } from './example/todo-list-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

class RootStore {
  todoList: TodoList
  news: News

  constructor() {
    this.todoList = new TodoList()
    this.news = new News()
  }
}

export default RootStore
