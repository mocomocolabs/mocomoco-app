import axios, { AxiosError } from 'axios'
import { IResponse } from '../../types/axios'
import { config } from '../config'

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
    return response.data ? JSON.parse(response.data) : response.data
  },
  (error: AxiosError) => {
    console.log(error.response)

    // Do something with response error
    return Promise.reject(error.response)
  }
)

export const http = _axios
