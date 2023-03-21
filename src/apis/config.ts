import axios, { AxiosResponse } from 'axios'
import router from '../router'

export const baseUrl = import.meta.env.VITE_API_BASE_URL

axios.defaults.timeout = 30000

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      let token
      if (res.headers && res.headers.authorization) {
        token = res.headers.authorization
        localStorage.setItem('token', token)
      }
      if (res.data.code === 10127 || res.data.code === 10126 || res.data.code === 10117) {
        // token失效
        localStorage.removeItem('token')
        router.replace('/login')
      }
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

function fetchData(method: Method, url: string, data: any = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](baseUrl + url, { params: data })
    } else {
      request = axios[method](baseUrl + url, data)
    }
    request
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        if (!axios.isCancel(e) || e.message !== 'canceled') {
          reject(e)
        }
      })
  })
}

export const get = function <T>(url: string, params?: T) {
  return fetchData('get', url, params)
}

export const post = function <T>(url: string, data?: T) {
  return fetchData('post', url, data)
}

export const put = function <T>(url: string, data?: T) {
  return fetchData('put', url, data)
}

export const remove = function <T>(url: string, params?: T) {
  return fetchData('delete', url, params)
}

export const upload = function <T extends maybeNullObject>(url: string, data: T) {
  const formData = new FormData()
  Object.keys(data).forEach((child) => {
    formData.append(child, data[child])
  })
  return post(url, formData)
}
