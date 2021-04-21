import { action, observable } from 'mobx'
import { task, Task } from 'mobx-task'
import { IUser } from '../models/user'
import { api } from '../services/api-service'
import { TaskBy } from './task'

const initState = {
  user: {} as IUser,
  currentUserId: null,
}

export class UserStore {
  // @observable.struct don't notify if new value is equal to old value.
  // Like observable.deep, except that any assigned value that
  // is structurally equal to the current value will be ignored.
  @observable.struct user: IUser = initState.user

  @task
  getUser = (async (userId: number) => {
    await api.get<IUser>(`http://localhost:8080/api/sys/users/${userId}`).then(
      action((data) => {
        this.setUser(data)
      })
    )
  }) as TaskBy<number>

  @action
  setUser = (newUser: IUser) => {
    this.user = newUser
  }

  @task.resolved
  updateUser = (async (user: IUser) => {
    try {
      await api.patch(`http://localhost:8080/api/sys/users`, user)
    } catch (e) {
      console.log('updateUser', e)
      return false
    }

    return true
  }) as Task<[IUser], boolean>
}
