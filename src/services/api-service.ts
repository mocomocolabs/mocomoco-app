import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IResponse } from '../../types/axios'
import { config } from '../config'
import { responseError, responseSuccess } from '../utils/http-helper-util'

class ApiService {
  http!: AxiosInstance

  constructor() {
    this.init()
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.http.get(url, config)
  }

  // eslint-disable-next-line
  post<T>(url: string, data?: any): Promise<T> {
    return this.http.post(url, data)
  }

  // eslint-disable-next-line
  put<T>(url: string, data: any): Promise<T> {
    return this.http.put(url, data)
  }

  // eslint-disable-next-line
  patch<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.http.patch(url, data, config)
  }

  delete<T>(url: string): Promise<T> {
    return this.http.delete(url)
  }

  setAuthoriationBy(token: string): boolean {
    this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return true
  }

  private async init() {
    this.http = axios.create({
      baseURL: config.API_URL,
      withCredentials: false,
      transformResponse: (r: IResponse) => r,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.http.interceptors.response.use(
      (response) => {
        return responseSuccess(response)
      },
      (error) => {
        console.log(error)

        // Do something with response error)
        return Promise.reject(responseError(error))
      }
    )
  }
}

export const api = new ApiService()
