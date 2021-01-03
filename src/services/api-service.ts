import axios, { AxiosInstance } from 'axios'
import { IResponse } from '../../types/axios'
import { config } from '../config'

class ApiService {
  http!: AxiosInstance

  constructor() {
    this.init()
  }

  get<T>(url: string): Promise<T> {
    return this.http.get(url)
  }

  // eslint-disable-next-line
  post<T>(url: string, data: any): Promise<T> {
    return this.http.post(url, data)
  }

  // eslint-disable-next-line
  put<T>(url: string, data: any): Promise<T> {
    return this.http.put(url, data)
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
        return JSON.parse(response.data)
      },
      (error) => {
        console.log(error)

        if (error.status === 401) {
          // TODO: refreshToken으로 재호출후 불가시 로그인 페이지로 redirect
        }

        // Do something with response error
        return Promise.reject(error)
      }
    )
  }
}

export const api = new ApiService()
