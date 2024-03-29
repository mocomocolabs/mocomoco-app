import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { RootStore } from '.'
import { ImageUploadItem } from '../components/molecules/ImageUploaderComponent'
import { User } from '../models/user'
import { IUser, IUserForm } from '../models/user.d'
import { api } from '../services/api-service'
import { AuthStore } from './auth-store'
import { TaskBy, TaskByAs } from './task'
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

  $auth: AuthStore

  constructor(rootStore: RootStore) {
    this.$auth = rootStore.$auth
  }

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
    await api.get<IUserDto>(`/sys/users/${_id}`).then(
      action((data) => {
        this.setUpdateForm({
          ...User.of(data),
        })
      })
    )
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

    // TODO 여기서 직접 호출하지 말고, userStore에서 updateUser flag를 observing 하면 어떨까나?
    this.$auth.updateUser()
    return true
  }) as TaskByAs<IUserForm, boolean>
}
