// src/api/modules/order.ts

import HttpRequest from '../request' // 导入封装好的请求工具

const apiOrder = new HttpRequest('', 5000)
// 导入 TS 类型 (假设放在这里或 type.ts)
// import { OrderListItem, OrderSearchParams } from './type';

// 1. 获取订单列表
export const getWithdrawalOrderList = ({ page = 1, pageSize = 50 }) => {
  return apiOrder.apiRequest(
    {
      page,
      pageSize
    },
    '/api/withdrawal/getWithdrawalOrderList',
    'get'
  )
  // request.get<T> 的 T 是返回数据（data字段）的类型
}

// 订单审核通过
export const approveWidthDraw = (orderId: string) => {
  return apiOrder.apiRequest({ orderId }, '/api/order/approve', 'post')
}

// 3. 撤回订单
export const revokeWidthDraw = (orderId: string) => {
  return apiOrder.apiRequest({ orderId }, '/api/order/revoke', 'post')
}
