import { AxiosError, AxiosResponse } from 'axios'
import { rootStore } from '../index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeWithError = (func: () => Promise<any>) => {
  func().catch((err) => {
    console.error(err)
    rootStore.$ui.showToastError({ message: err.message })
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const responseSuccess = (response: AxiosResponse<any>) => {
  return response.data ? JSON.parse(response.data) : response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const responseError = (error: AxiosError<any>) => {
  return error.response?.data ? JSON.parse(error.response.data) : error.response
}
