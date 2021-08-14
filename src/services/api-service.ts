import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IResponse } from '../../types/axios'
import { config } from '../config'
import { rootStore } from '../index'
import { signInWithTokenApiUrl } from '../stores/auth-store'
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private signOutRequiredFor = (reason: any) =>
    (reason.status === 401 && reason.config?.url !== signInWithTokenApiUrl) ||
    (reason.status === 500 &&
      ['unauthorized.msg', 'JWT String argument cannot be null or empty.'].includes(reason.message))

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

        const reason = responseError(error)
        console.log('responseError', reason)

        if (this.signOutRequiredFor(reason)) {
          console.log('👅 force to sign out')
          rootStore.$ui.showAlert({
            message: '서버 연결이 만료되었습니다. 계속 이용하시려면 다시 로그인해주세요.',
            onSuccess: () => rootStore.$auth.signOutCallback(),
          })
        }

        return Promise.reject(reason)
      }
    )
  }
}

export const api = new ApiService()
