import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig // 适用于拦截器
} from 'axios'

const defaultConfig: AxiosRequestConfig = {
  // baseURL: import.meta.env.VITE_BASE_URL ? `${window.location.protocol}\/\/${import.meta.env.VITE_BASE_URL}`: null,
  baseURL: '', // 使用相对路径，通过 Vite 代理
  // 请求超时时间
  timeout: 30 * 60 * 1000,
  headers: {
    Accept: 'application/json, text/plain, *',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

class HttpRequest {
  baseURL: string
  // 对象类型。属性是string，值是any类型
  queue: Record<string, any>

  constructor(baseURL: string, timeout: number) {
    this.baseURL = baseURL
    this.queue = {}
  }

  destroy(url: string) {
    delete this.queue[url]
  }

  interceptors(instance: AxiosInstance, url: string) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // config.headers['Access-Control-Allow-Origin'] = '*'

        // 要存token。每次访问其他页面需要带token，存在pinia中，也可以存在本地localstorage
        const token = JSON.parse(localStorage.getItem('token') as string)

        if (token) {
          // 添加token
          config.headers.Authorization = `Bearer ${token}`
        }

        this.queue[url] = true
        return config
      },
      (error: InternalAxiosRequestConfig) => {
        return Promise.reject(error)
      }
    )
  }

  //  响应拦截器
  interceptorsResponse(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (res: any) => {
        if (res.config?.url) {
          this.destroy(res.config.url)
        }
        return res.data
      },
      (error: AxiosError) => {
        if (error.config?.url) {
          this.destroy(error.config.url)
        }
        return Promise.reject(error)
      }
    )
  }

  request(options: any) {
    options.url = this.baseURL + options.url

    const instance = axios.create(defaultConfig) //路由实例
    this.interceptors(instance, options.url) //instance 拦截器

    if (options.method == 'post') {
      return instance.post(options.url, options.data)
    } else if (options.method == 'get') {
      return instance.get(options.url, {
        params: options.data
      })
    }
  }

  apiRequest(data: any, url: string, method: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          this.request({
            url: url,
            data,
            method: method
          })
        )
        reject({ code: 2, msg: '请求错误,请重新操作' })
      }, 1000)
    })
      .then(res => {
        return res
      })
      .catch(err => {
        return { code: -1, msg: '网络超时,请重新操作' }
      })
  }
}

export default HttpRequest
