// 登录类型
interface login {
  username: string
  password: string
  captchaId: string
  captcha: string
  source: string
}

// 提现订单列表类型
interface withDrawOrderListList {
  id: number
  planId: number
  accountId: number
  deviceId: string
  amount: number
  orderState: number
  additionalInformation?: null
  createdAt: string
  transferTime: string
  merchantId: string
  openid: string
  wxAppid: string
  points: number
  outBatchNo: string
  payBatchId: string
  payBatchErr: string
  payDetailId: string
  payFailReason: string
  ip: string
  auditReason?: string
}

export type { login, withDrawOrderListList }
