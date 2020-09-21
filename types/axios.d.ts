import 'axios'

interface IResponse {
  [key: string]: string
  // result: any
  // errorMessage: string
}

declare module 'axios' {
  export interface AxiosInstance {
    get<T = IResponse>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T = IResponse>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = IResponse>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    put<T = IResponse>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  }
}
