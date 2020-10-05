import { action, extendObservable, observable, runInAction, transaction } from 'mobx'
import { task } from 'mobx-task'
import { IUser } from '../models/user'
import { http } from '../utils/http-util'
import { Task } from './task.d'
import { GetUserTask, SetUserTask, UpdateUserTask } from './user-store.d'

const initState = {
  user: {} as IUser,
  currentUserId: null,
}

export class User {
  // @observable.struct don't notify if new value is equal to old value.
  // Like observable.deep, except that any assigned value that
  // is structurally equal to the current value will be ignored.
  @observable.struct user: IUser = initState.user

  // primitive value will be observable.box automatically
  @observable currentUserId: number | null = initState.currentUserId

  constructor() {
    ;(async () => {
      await new Promise(() => this.getCurrentUserId())
    })()
  }

  @task
  getCurrentUserId = (async () => {
    if (this.currentUserId != null) {
      return
    }

    await http.get<{ userId: number }>(`/users/current`).then(
      action(({ userId }) => {
        // TODO error handling - when userId not received
        this.setCurrentUserId(userId)
      })
    )
  }) as Task

  @action
  setCurrentUserId = (userId: number) => {
    this.currentUserId = userId
  }

  @task
  getUser = (async (userId: number) => {
    await http.get<IUser>(`/users/${userId}`).then(
      action((data) => {
        this.setUser(data)
      })
    )
  }) as GetUserTask

  // TODO: test - transaction gives better performance?
  @task.resolved
  setUser = (async (newUser: IUser) => {
    runInAction(() => {
      // transaction notify a change after all the job finished
      // it is not async function, but may be ok because it is running inside async task
      transaction(() => extendObservable(this.user, newUser))
    })
  }) as SetUserTask

  // TODO fix: type-checking not working on caller. mobx-state-tree may be an useful solution
  @task.resolved
  updateUser = (async (userId: number, data: IUser, listener: () => void) => {
    await http.patch<IUser>(`/users/${userId}`, data).then((result) => {
      if (!result) {
        return
      }

      listener()
      this.getUser(userId)
    })
  }) as UpdateUserTask
}
