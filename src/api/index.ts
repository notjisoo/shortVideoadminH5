// src/api/index.ts

import * as widthDrawApi from './modules/widthdraw'
import * as UserApi from './modules/user'
import request from './request'

// 将所有 API 模块整合成一个对象导出
export const api = {
  withDraw: widthDrawApi,
  user: UserApi
  // ... 其他模块
}

// 也导出 request 工具，以备不时之需
export { request }
