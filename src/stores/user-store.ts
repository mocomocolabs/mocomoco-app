import { action, observable } from 'mobx'
import { task, Task } from 'mobx-task'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { User } from '../models/user'
import { IUser, IUserForm } from '../models/user.d'
import { api } from '../services/api-service'
import { urlToFile } from '../utils/image-util'
import { TaskBy } from './task'
import { IUserDto } from './user-store.d'

const initState = {
  user: {} as IUser,
  form: {
    description: '',
    image: {} as ImageUploadItem,
  } as IUserForm,
  currentUserId: null,
}

export class UserStore {
  // @observable.struct don't notify if new value is equal to old value.
  // Like observable.deep, except that any assigned value that
  // is structurally equal to the current value will be ignored.
  @observable.struct user: IUser = initState.user
  @observable.struct updateForm: IUserForm = initState.form

  @task
  getUser = (async (userId: number) => {
    await api.get<IUserDto>(`/sys/users/${userId}`).then(
      action((data) => {
        this.setUser(User.of(data))
      })
    )
  }) as TaskBy<number>

  @action
  setUser = (newUser: IUser) => {
    this.user = newUser
  }

  @task
  getUpdateForm = (async (_id: number) => {
    await this.getUser(_id)

    // TODO 20210903-1 서버작업 완료되면 지울 것
    const image: ImageUploadItem | undefined = !!this.user.profileUrl
      ? ((await urlToFile(this.user.profileUrl)) as ImageUploadItem)
      : undefined

    this.setUpdateForm({
      ...this.user,
      image,
    })
  }) as TaskBy<number>

  @action
  setUpdateForm(data: Partial<IUserForm>) {
    this.updateForm = {
      ...initState.form,
      ...data,
    }
  }

  @action
  resetUpdateForm() {
    this.updateForm = initState.form
  }

  @task.resolved
  updateUser = (async (form: IUserForm) => {
    try {
      await api.patch(`/sys/users`, form)

      if (form.image) {
        const formData = new FormData()
        formData.append('files', form.image, form.image.name)
        await api.patch(`/sys/users/${form.id}/profile`, formData)
      }
    } catch (e) {
      console.log('updateUser', e)
      return false
    }

    return true
  }) as Task<[IUserForm], boolean>
}
