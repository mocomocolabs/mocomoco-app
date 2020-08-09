import axios from 'axios'
import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'

import { INews } from '../../models/example/news'
import { Task } from '../task'

const initState = {
  news: [],
  query: '',
}

export class News {
  @observable.shallow news: INews[] = initState.news
  @observable query = initState.query

  @task
  getNews = (async () => {
    await new Promise((r) => setTimeout(() => r(), 1000))

    await axios.get('https://api.hnpwa.com/v0/news/1.json').then(({ data }) => {
      this.news = data
    })
  }) as Task

  @action
  setQuery = (_query: string) => {
    this.query = _query
  }

  @computed
  get filteredNews(): INews[] {
    return this.news.filter((v) => v.title.includes(this.query))
  }
}
