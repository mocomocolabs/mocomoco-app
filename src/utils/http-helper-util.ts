import { AxiosError, AxiosResponse } from 'axios'
import { rootStore } from '../index'

export const executeWithError = (func: () => Promise<any>) => {
  func().catch((err) => {
    console.error(err)
    rootStore.$ui.showToastError({ message: err.message })
  })
}

export const responseSuccess = (response: AxiosResponse<any>) => {
  return response.data ? JSON.parse(response.data) : response.data
}

export const responseError = (error: AxiosError<any>) => {
  return error.response?.data ? JSON.parse(error.response.data) : error.response
}
