import { Task as TaskType } from 'mobx-task'
export type Task = TaskType<[], void>

export type TaskBy<T extends any> = TaskType<[T], void>
export type TaskBy2<T extends any, U extends any> = TaskType<[T, U], void>
export type TaskBy3<T extends any, U extends any, V extends any> = TaskType<[T, U, V], void>
