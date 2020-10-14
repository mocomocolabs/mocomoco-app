import { action, observable } from 'mobx'
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
    this.getCurrentUserId()
  }

  @task
  getCurrentUserId = (async () => {
    if (this.currentUserId != null) {
      return
    }

    await http.get<{ userId: number }>(`/users/current`).then(
      action(({ userId }) => {
        // TODO error handling - when userId not received from server
        this.setCurrentUserId(userId)
      })
    )
  }) as Task

  @action
  setCurrentUserId = (userId: number) => {
    this.currentUserId = userId
  }

  @task
  getCurrentUser = (async () => {
    await this.getCurrentUserId()
    this.getUser(this.currentUserId!)
  }) as Task

  @task
  getUser = (async (userId: number) => {
    await http.get<IUser>(`/users/${userId}`).then(
      action((data) => {
        this.setUser(data)
      })
    )
  }) as GetUserTask

  @task.resolved
  setUser = (async (newUser: IUser) => {
    this.user = newUser
  }) as SetUserTask

  // TODO fix: type checking required for actual values inside data object
  @task.resolved
  updateUser = (async (userId: number, data: IUser) => {
    const { success } = await http.patch<IUser, { success: boolean }>(`/users/${userId}`, data)

    if (success) {
      this.getUser(userId)
    }

    return success
  }) as UpdateUserTask
}
