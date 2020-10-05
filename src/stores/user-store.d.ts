import { Task as TaskType } from 'mobx-task'
import { IUser } from './../models/user.d'

export type GetUserTask = TaskType<[number], void>

export type SetUserTask = TaskType<[IUser], void>

export type UpdateUserTask = TaskType<[number, IUser], boolean>
