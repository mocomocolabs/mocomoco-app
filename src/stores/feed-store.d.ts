import { Task } from 'mobx-task'
import { IFeedForm } from '../models/feed'

export type InsertFeedTask = Task<[Partial<IFeedForm>], void>
