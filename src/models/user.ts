import { IUserDto } from '../stores/user-store.d'
import { IUser } from './user.d'

export interface User extends IUser {}

export class User {
  static of(dto: IUserDto) {
    return Object.assign(new User(), {
      ...dto,
      profileUrl: dto.atchFiles[0]?.url,
    })
  }
}
