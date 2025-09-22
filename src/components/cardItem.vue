<template>
  <a-card size="small" style="width: 100%; border: 1px solid #266fff;margin-bottom: 30rpx;">
    <a-flex gap="middle" justify="center" vertical>
      <!-- 信息展示 -->
      <a-flex gap="middle" justify="around" vertical>
        <div class="userId">
          用户ID:&nbsp;
          <span>{{ data.accountId }}</span>
          <!-- 封装一个复制功能按钮 -->
          <Copybutton :text="String(data.accountId)" />
        </div>
        <div>订单ID：&nbsp;<span>{{ data.id }}</span></div>
        <div>提现金额: &nbsp;<span>{{ data.amount }}</span></div>
        <div>进入审核原因: &nbsp;<span>{{ data.auditReason }}</span></div>

        <!-- 时间格式化成年月日时分秒 -->
        <div>
          创建时间:&nbsp;<span>{{ data.createdAt }}</span>
        </div>
      </a-flex>

      <!-- 三个按钮 -->
      <a-flex gap="middle" justify="end" align="center">
        <a-button size="large" type="default">订单详情</a-button>
        <a-flex v-if="data.orderState === 0" gap="middle">
          <a-button size="large" danger>拒绝</a-button>
          <a-button size="large" type="primary">通过</a-button>
        </a-flex>
        <a-flex v-else>
          <a-button size="large" type="primary">撤回</a-button>
        </a-flex>
        <!-- 如果是打款终止就保留订单详情。拒绝和通过不要。新增撤回功能 -->
      </a-flex>
    </a-flex>
  </a-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Copybutton from './copyButton.vue'
import type { withDrawOrderListList } from '@/api/types';

// 定义 props 类型
const props = defineProps<{
  data: withDrawOrderListList
  status?: number
}>()


// 复制用户ID
function onCopy(certB64: string) {
  let oInput = document.createElement('input')
  oInput.value = certB64
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.remove()
}



</script>

<style scoped lang="less">
.userId {
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
