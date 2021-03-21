import { Task } from 'mobx-task'
import { IClubForm } from '../models/club.d'

export type InsertClubTask = Task<[Partial<IClubForm>], void>
