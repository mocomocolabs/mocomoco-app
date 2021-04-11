import { Task as TaskType } from 'mobx-task'
import { IUser } from './../models/user.d'

export type GetUserTask = TaskType<[number], void>

export type SetUserTask = TaskType<[IUser], void>

export type UpdateUserTask = TaskType<[number, IUser], boolean>

export type IUserDto = {
  // communities: [{id: 1, name: "진강산 공동체", locale: "ko_KR", adminUsers: [], users: [], atchFiles: [], isUse: true,…}]
  id: number
  email: string
  name: string
  nickname: string
  fcmToken: string
  isPublicEmail: boolean
  isPublicMobile: boolean
  isUse: boolean
  mobile: string
  status: string
  createdAt: string
}
