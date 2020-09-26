import axios from 'axios'
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
    return JSON.parse(response.data)
  },
  (error) => {
    console.log(error)

    // Do something with response error
    return Promise.reject(error)
  }
)

export const http = _axios
