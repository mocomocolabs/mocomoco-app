import { Task as TaskType } from 'mobx-task'
export type Task = TaskType<[], void>

// eslint-disable-next-line
export type TaskBy<T extends any> = TaskType<[T], void>

// eslint-disable-next-line
export type TaskBy2<T extends any, U extends any> = TaskType<[T, U], void>

// eslint-disable-next-line
export type TaskBy3<T extends any, U extends any, V extends any> = TaskType<[T, U, V], void>
