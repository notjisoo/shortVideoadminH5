// src/api/modules/order.ts

import HttpRequest from '../request' // 导入封装好的请求工具

const apiUser = new HttpRequest('', 5000) // 使用相对路径，通过 Vite 代理

export const loginapi = (data: any, url: string, method: string) => {
  return apiUser.apiRequest(data, url, 'post')
  // request.get<T> 的 T 是返回数据（data字段）的类型
}
