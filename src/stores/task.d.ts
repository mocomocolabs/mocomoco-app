import { Task as TaskType } from 'mobx-task'
export type Task = TaskType<[], void>

export type TaskByString = TaskType<[string], void>

// TODO: generic으로 타입 정의할 수 있도록 작업 필요
export type TaskByNumber = TaskType<[number], void>
