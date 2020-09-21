import { action, computed, observable } from 'mobx'
import { TodoItem } from './todo-item-store'

const initState = {
  todos: ['안녕', '땀땀연구소', '함께 :)'],
}

export class TodoList {
  @observable.shallow list: TodoItem[] = []
  @observable query = ''

  constructor() {
    initState.todos.forEach(this.addTodo)
  }

  @action
  addTodo = (text: string) => {
    this.list.push(new TodoItem(text))
  }

  @action
  removeTodo = (todo: TodoItem) => {
    this.list.splice(this.list.indexOf(todo), 1)
  }

  @action
  setQuery = (query: string) => {
    this.query = query
  }

  @computed
  get finishedTodos(): TodoItem[] {
    return this.list.filter((todo) => todo.isDone)
  }

  @computed
  get openTodos(): TodoItem[] {
    return this.list.filter((todo) => !todo.isDone)
  }

  @computed
  get filteredTodos(): TodoItem[] {
    return this.list.filter((todo) => todo.text.includes(this.query))
  }
}
