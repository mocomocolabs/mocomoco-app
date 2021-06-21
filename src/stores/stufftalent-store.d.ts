import { Task } from 'mobx-task'
import { IUser } from '../models/user.d'
import {
  IStuffTalentForm,
  StuffTalentMethod as Method,
  StuffTalentPathName as PathName,
  StuffTalentStatus as Status,
  StuffTalentType as Type,
} from './../models/stufftalent.d'
import { IFileDto } from './common/file.d'

export type InsertStuffTalentTask = Task<[Partial<IStuffTalentForm>], void>

interface IStuffTalentDtoBase {
  id: number
  type: Type
  status: Status
  method: Method
  category: IStuffTalentCategoryDto
  user: IUser
  title: string
  content: string
  price: number // TODO: need a string type
  isPublic: boolean
  createdAt: string
  atchFiles: IFileDto[]
  isUse: boolean
}

export interface IStuffTalentDto extends IStuffTalentDtoBase {
  stuffUsers: IUser[]
  talentUsers: IUser[]
}

export interface IStuffsTalentsDto {
  stuffs: IStuffTalentDto[]
  talents: IStuffTalentDto[]
}

export interface IStuffTalentCategoryDto {
  id: number
  name: string
}

export type StuffTalentPath = { [name in PathName]: string }
