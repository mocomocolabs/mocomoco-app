import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IFeed } from '../models/feed'
import { http } from '../utils/http-util'
import { Task } from './task'

const initState = {
  feeds: [],
}

export class Feed {
  @observable.ref feeds: IFeed[] = initState.feeds

  @task
  getFeeds = (async () => {
    await http.get<IFeed[]>('/feeds').then(
      action((data) => {
        console.log(data)

        this.feeds = data
      })
    )
  }) as Task
}
