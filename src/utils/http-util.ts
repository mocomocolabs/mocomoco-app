import axios, { AxiosError } from 'axios'
import { IResponse } from '../../types/axios'
import { config } from '../config'
import { responseError, responseSuccess } from '../utils/http-helper-util'

// interface IAxiosResponse {
//   data: IResponse
// }

// interface IResponse {
//   result: any
//   errorMessage: string
// }

const _axios = axios.create({
  baseURL: config.API_URL,
  withCredentials: false,
  transformResponse: (r: IResponse) => r,
  headers: {
    'Content-Type': 'application/json',
  },
})

_axios.interceptors.response.use(
  (response) => {
    return responseSuccess(response)
  },
  (error: AxiosError) => {
    console.error(error.response)

    // Do something with response error
    return Promise.reject(responseError(error))
  }
)

export const http = _axios
