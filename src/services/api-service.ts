import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IResponse } from '../../types/axios'
import { config } from '../config'
import { rootStore } from '../index'
import { responseError, responseSuccess } from '../utils/http-helper-util'
import { refreshTokenApiUrl } from './../stores/auth-store'
import { storage } from './storage-service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WaitingRequestCallback = { resolve: (value: unknown) => void; reject: (reason: any) => void }

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
      async (error) => {
        return this.handleResponseError(error)
      }
    )
  }

  private isTokenRefreshing = false
  private waitingRequests = [] as WaitingRequestCallback[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleResponseError = async (error: any) => {
    const response = responseError(error)
    console.log('intercept responseError', response, error.config)

    const originalRequest = error.config

    if (
      (response?.status === 401 && originalRequest.url === refreshTokenApiUrl) ||
      (response?.status === 500 &&
        ['unauthorized.msg', 'JWT String argument cannot be null or empty.'].includes(response?.message))
    ) {
      console.log('force signout')
      this.forceToSignOut()
      return Promise.reject(error)
    }

    if (response?.status === 401 && !originalRequest._retry) {
      if (this.isTokenRefreshing) {
        return this.waitForTokenRefreshing(originalRequest)
      }

      originalRequest._retry = true
      this.isTokenRefreshing = true

      return this.refreshToken(originalRequest)
    }

    return Promise.reject(error)
  }

  private waitForTokenRefreshing = (request: AxiosRequestConfig) =>
    new Promise((resolve, reject) => {
      this.waitingRequests.push({ resolve, reject })
    })
      .then((token) => {
        request.headers['Authorization'] = 'Bearer ' + token
        return this.http(request)
      })
      .catch((error) => {
        return Promise.reject(error)
      })

  private refreshToken = (request: AxiosRequestConfig) =>
    new Promise(async (resolve, reject) => {
      try {
        await rootStore.$auth.refreshToken()
        const newAccessToken = await storage.getAccessToken()
        console.log('new token:', newAccessToken)

        this.processWaitingRequests(null, newAccessToken)

        request.headers.Authorization = 'Bearer ' + newAccessToken
        resolve(this.http(request))
      } catch (error) {
        console.log('refreshToken 기한 만료!! error=', error)

        this.processWaitingRequests(error)

        reject(error)

        this.forceToSignOut()
      } finally {
        this.isTokenRefreshing = false
      }
    })

  private processWaitingRequests = (error: unknown, accessToken?: string) => {
    this.waitingRequests.forEach((callback) => {
      error ? callback.reject(error) : callback.resolve(accessToken)
    })

    this.waitingRequests.length = 0
  }

  private forceToSignOut = () => {
    console.log('👅 force to sign out, isLogin?', rootStore.$auth.isLogin)
    rootStore.$ui.showAlert({
      message: '서버 연결이 만료되었습니다. 계속 이용하시려면 다시 로그인해주세요.',
      onSuccess: async () => {
        await rootStore.$auth.signOutCallback()
      },
      onFail: async () => {
        await rootStore.$auth.signOutCallback()
      },
    })
  }
}

export const api = new ApiService()
